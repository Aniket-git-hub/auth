import express from 'express';
import { upload } from '../middleware/uploadDocument.js';

import { client, settings } from '../config/ftpClient.js';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import CATEGORY from '../models/categoryModel.js';
import VIDEO from '../models/videoModel.js';

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get(
    '/',
    async (req, res) => {
        try {
            const videos = await VIDEO.findAll({
                include: [
                    {
                        model: CATEGORY,
                        attributes: ['id', 'name']
                    }
                ],
                exclude: ['VideoCategory']
            })
            res.json({
                videos
            })
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

router.get(
    '/thumbnail/:videoId',
    async (req, res) => {
        const videoId = req.params.videoId;

        // Fetch video details from the database
        const video = await VIDEO.findOne({ where: { id: videoId } });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const ftpDataPath = "/";
        const thumbnailPath = ftpDataPath + video.thumbnailName;
        const tempThumbnailLocalPath = path.join(__dirname, "..", "download", video.thumbnailName);

        client.ftp.verbose = true;
        try {
            await client.access(settings);

            // Download thumbnail
            await client.downloadTo(tempThumbnailLocalPath, thumbnailPath);

            // Stream thumbnail to the user
            res.setHeader('Content-Type', 'image/jpeg');
            const thumbnailReadStream = fs.createReadStream(tempThumbnailLocalPath);
            thumbnailReadStream.pipe(res);

            thumbnailReadStream.on('end', () => fs.unlink(tempThumbnailLocalPath, err => err && console.error(err)));

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            client.close();
        }
    }
)

router.get(
    '/download/:videoId',
    async (req, res) => {
        const videoId = req.params.videoId;

        // Fetch video details from the database
        const video = await VIDEO.findOne({ where: { id: videoId } });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const ftpDataPath = "/";
        const videoPath = ftpDataPath + video.videoName;
        const tempVideoLocalPath = path.join(__dirname, "..", "download", video.videoName);

        client.ftp.verbose = true;
        try {
            await client.access(settings);

            await client.downloadTo(tempVideoLocalPath, videoPath);

            res.setHeader('Content-Disposition', 'attachment; filename=' + video.videoName);
            res.setHeader('Content-Transfer-Encoding', 'binary');
            res.setHeader('Content-Type', 'video/mp4');


            res.download(tempVideoLocalPath, video.videoName, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                }
                fs.unlink(tempVideoLocalPath, err => err && console.error(err));
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            client.close();
        }
    }
);

router.get(
    '/:videoId',
    async (req, res) => {
        const videoId = req.params.videoId;

        // Fetch video details from the database
        const video = await VIDEO.findOne({ where: { id: videoId } });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const ftpDataPath = "/";
        const videoPath = ftpDataPath + video.videoName;
        const tempVideoLocalPath = path.join(__dirname, "..", "download", video.videoName);

        client.ftp.verbose = true;
        try {
            await client.access(settings);

            // Download video
            await client.downloadTo(tempVideoLocalPath, videoPath);

            // Stream video to the user
            res.setHeader('Content-Type', 'video/mp4');
            const videoReadStream = fs.createReadStream(tempVideoLocalPath);
            videoReadStream.pipe(res);

            videoReadStream.on('end', () => fs.unlink(tempVideoLocalPath, err => err && console.error(err)));

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
    upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    async (req, res) => {
        const videoFile = req.files['video'][0];
        const thumbnailFile = req.files['thumbnail'][0];

        const ftpDataPath = "/";
        const videoPath = ftpDataPath + videoFile.filename;
        const thumbnailPath = ftpDataPath + thumbnailFile.filename;

        client.ftp.verbose = true;
        try {
            await client.access(settings);
            await client.uploadFrom(videoFile.path, videoPath);
            await client.uploadFrom(thumbnailFile.path, thumbnailPath);

            const video = await VIDEO.create({
                title: req.body.title,
                videoName: videoFile.filename,
                thumbnailName: thumbnailFile.filename
            });

            await video.addCategory(req.body.categoryId)

            res.json({ message: 'Video and thumbnail uploaded successfully', video });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            client.close();
        }
    }
);

router.delete(
    '/:videoId',
    async (req, res) => {
        const videoId = req.params.videoId;

        // Fetch video details from the database
        const video = await VIDEO.findOne({ where: { id: videoId } });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const ftpDataPath = "/";
        const videoPath = ftpDataPath + video.videoName;
        const thumbnailPath = ftpDataPath + video.thumbnailName;

        client.ftp.verbose = true;
        try {
            await client.access(settings);

            // Delete video and thumbnail from FTP server
            await client.remove(videoPath);
            await client.remove(thumbnailPath);

            // Delete video record from the database
            await video.destroy();

            res.json({ message: 'Video and thumbnail deleted successfully' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            client.close();
        }
    }
);

export default router;
