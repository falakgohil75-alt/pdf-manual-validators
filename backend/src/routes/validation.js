const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.post('/validate', authMiddleware, validationController.startValidation);
router.get('/:validationId', authMiddleware, validationController.getValidationResult);
router.get('/:validationId/errors', authMiddleware, validationController.getDetailedErrors);
router.get('/:validationId/summary', authMiddleware, validationController.getValidationSummary);
router.get('/:validationId/comparison', authMiddleware, validationController.getPdfComparison);
router.put('/:validationId', authMiddleware, validationController.updateValidation);
router.delete('/:validationId', authMiddleware, validationController.deleteValidation);

module.exports = router;
