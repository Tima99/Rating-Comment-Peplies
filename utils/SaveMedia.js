const multer = require("multer");
const path = require("path");
const crypto = require('crypto')

const uploadDir = path.join(__dirname, "../uploads");
// setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const $path = path.join(uploadDir , file.fieldname === 'thumbnail' ? 'thumbnails' : 'videos');
        cb(null, $path);
    },
    filename: async (req, file, cb) => {
            cb(null, `${crypto.randomUUID()}${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload