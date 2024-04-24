import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalName = sanitizeFilename(file.originalname);
        const filenameWithTimestamp = `${timestamp}_${originalName}`;
        cb(null, filenameWithTimestamp)
    }
});

export const upload = multer({ storage: storage });

const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-zA-Z0-9_.-]/g, '_');
};
