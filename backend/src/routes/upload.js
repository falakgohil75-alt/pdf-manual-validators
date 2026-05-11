const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/auth');
const { uploadMiddleware } = require('../middleware/upload');

// Protected routes
router.post('/reference', authMiddleware, uploadMiddleware('file'), uploadController.uploadReference);
router.post('/student', authMiddleware, uploadMiddleware('file'), uploadController.uploadStudent);
router.get('/status/:validationId', authMiddleware, uploadController.getUploadStatus);
router.delete('/:fileId', authMiddleware, uploadController.deleteFile);

module.exports = router;
