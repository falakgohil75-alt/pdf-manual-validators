const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/highlighted-pdf/:validationId', authMiddleware, downloadController.downloadHighlightedPdf);
router.get('/report/:validationId', authMiddleware, downloadController.downloadReport);
router.get('/summary/:validationId', authMiddleware, downloadController.downloadSummary);

module.exports = router;
