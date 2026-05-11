const mongoose = require('mongoose');

const batchValidationSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  batchName: {
    type: String,
    required: true
  },
  description: String,
  totalFiles: {
    type: Number,
    default: 0
  },
  processedFiles: {
    type: Number,
    default: 0
  },
  successCount: {
    type: Number,
    default: 0
  },
  failureCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  validations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Validation'
  }],
  averageValidationPercentage: Number,
  startedAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'batch_validations'
});

batchValidationSchema.index({ teacher: 1, createdAt: -1 });
batchValidationSchema.index({ status: 1 });

module.exports = mongoose.model('BatchValidation', batchValidationSchema);
