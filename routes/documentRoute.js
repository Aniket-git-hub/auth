import express from 'express';
import { upload } from '../middleware/uploadDocument.js';

import { client, settings } from '../config/ftpClient.js';
import DOCUMENT from '../models/documentModel.js';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import CATEGORY from '../models/categoryModel.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get(
    '/',
    async (req, res) => {
        try {
            const documents = await DOCUMENT.findAll({
                include: [
                    {
                        model: CATEGORY,
                        attributes: ['id', 'name'],
                    }
                ],
            })
            res.json({ documents })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

router.get(
    '/:documentId',
    async (req, res) => {
        const documentId = req.params.documentId;

        const document = await DOCUMENT.findOne({ where: { id: documentId } });
        console.log(document)
        if (!document) {
            return res.status(404).json({ error: 'File not found' });
        }

        const cPanelPath = document.path + document.name;
        const tempLocalPath = path.join(__dirname, "..", "download", documentId);

        client.ftp.verbose = true;
        try {
            await client.access(settings);

            await client.downloadTo(`${tempLocalPath}`, cPanelPath);

            res.setHeader('Content-disposition', 'attachment; filename=' + documentId);
            const readStream = fs.createReadStream(tempLocalPath);
            readStream.pipe(res);

            readStream.on('end', () => fs.unlink(tempLocalPath, err => err && console.error(err)));

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            client.close();
        }
    }
);


router.post(
    '/',
    upload.single('file'),
    async (req, res) => {
        const localPath = req.file.path;
        const ftpDataPath = "/";
        const originalName = req.file.filename

        client.ftp.verbose = true;
        try {
            await client.access(settings);
            await client.cd(ftpDataPath)
            await client.uploadFrom(localPath, ftpDataPath + originalName);

            const document = await DOCUMENT.create({
                name: originalName,
                path: ftpDataPath,
                caption: req.body.caption
            });
            await document.addCategory(req.body.categoryId)

            fs.unlink(localPath, err => err && console.error(err))

            res.json({
                message: 'File uploaded successfully', document
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            client.close();
        }
    }
);

router.delete('/:id', async (req, res) => {
    const documentId = req.params.id;

    const document = await Document.findByPk(documentId);

    if (!document) {
        return res.status(404).json({ error: 'Document not found' });
    }

    const cPanelPath = document.path;
    const localPath = path.join(__dirname, "..", "download", document.name);

    client.ftp.verbose = true;
    try {
        await client.access(settings);

        await client.remove(cPanelPath);

        await document.destroy();

        res.json({ message: 'Document deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.close();
    }
});

export default router;
