const mongoose = require('mongoose');

const validationErrorSchema = new mongoose.Schema({
  validation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Validation',
    required: true,
    index: true
  },
  pageNumber: {
    type: Number,
    required: true
  },
  errorType: {
    type: String,
    enum: [
      'FIRST_PAGE_VALIDATION',
      'SECOND_PAGE_VALIDATION',
      'THIRD_PAGE_VALIDATION',
      'HEADER_FOOTER_VALIDATION',
      'FONT_VALIDATION',
      'PRACTICAL_VALIDATION',
      'BLANK_PAGE',
      'PAGE_NUMBER_VALIDATION',
      'INSTRUCTION_PAGE',
      'STRUCTURE_VALIDATION'
    ],
    required: true
  },
  severity: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium'
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  suggestedFix: String,
  affectedText: String,
  coordinates: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  },
  detectedValue: String,
  expectedValue: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'validation_errors'
});

// Index for faster queries
validationErrorSchema.index({ validation: 1, pageNumber: 1 });
validationErrorSchema.index({ severity: 1 });
validationErrorSchema.index({ errorType: 1 });

module.exports = mongoose.model('ValidationError', validationErrorSchema);
