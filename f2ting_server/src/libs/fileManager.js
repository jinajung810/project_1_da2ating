const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  },
});

const fileUploader = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

function convertFileToFileSchema(file) {
  if (!file) return undefined;

  const path = '/public/' + file.filename;
  const fileName = file.filename;
  const originalName = file.originalname;
  const mimeType = file.mimetype;
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
  const size = file.size;

  return { path, fileName, originalName, mimeType, extension, size }
}

module.exports = {
  fileUploader,
  convertFileToFileSchema
};