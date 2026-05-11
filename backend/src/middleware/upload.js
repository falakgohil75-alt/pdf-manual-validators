const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

// Create upload directories if they don't exist
const uploadDir = path.join(__dirname, '../../uploads');
const tempDir = path.join(__dirname, '../../temp');

[uploadDir, tempDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['application/pdf'];
  const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 50000000; // 50MB

  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Only PDF files are allowed'));
  }

  cb(null, true);
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50000000
  }
});

// Middleware
const uploadMiddleware = (fieldName) => upload.single(fieldName);

module.exports = {
  upload,
  uploadMiddleware,
  uploadDir,
  tempDir
};
