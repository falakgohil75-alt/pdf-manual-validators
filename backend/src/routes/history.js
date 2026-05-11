const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/', authMiddleware, historyController.getValidationHistory);
router.get('/batch/:batchId', authMiddleware, historyController.getBatchHistory);
router.get('/student/:studentName', authMiddleware, historyController.getStudentHistory);
router.delete('/:validationId', authMiddleware, historyController.deleteHistory);
router.post('/export', authMiddleware, historyController.exportHistory);

module.exports = router;
