import uploadDocumentService from "../../services/document/uploadDocumentService.js";

async function uploadDocumentController(req, res, next) {
    try {
        const localPath = req.file.path;
        const ftpDataPath = "/"
        const document = await uploadDocumentService(localPath, ftpDataPath)
        res.json({
            message: "File uploaded successfully",
            document
        })
    } catch (error) {
        next(error)
    }
}

export default uploadDocumentController