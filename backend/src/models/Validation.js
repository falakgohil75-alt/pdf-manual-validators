const mongoose = require('mongoose');

const validationSchema = new mongoose.Schema({
  validationId: {
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
  studentName: String,
  enrollmentNumber: String,
  academicYear: String,
  referenceFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  studentFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  completedAt: Date,
  totalErrors: {
    type: Number,
    default: 0
  },
  criticalErrors: {
    type: Number,
    default: 0
  },
  highErrors: {
    type: Number,
    default: 0
  },
  mediumErrors: {
    type: Number,
    default: 0
  },
  lowErrors: {
    type: Number,
    default: 0
  },
  validationPercentage: {
    type: Number,
    default: 0
  },
  notes: String,
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
  collection: 'validations'
});

// Index for faster queries
validationSchema.index({ teacher: 1, createdAt: -1 });
validationSchema.index({ status: 1 });
validationSchema.index({ validationId: 1 });

module.exports = mongoose.model('Validation', validationSchema);
