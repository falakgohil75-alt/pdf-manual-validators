const mongoose = require('mongoose');

const highlightedPdfSchema = new mongoose.Schema({
  validation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Validation',
    required: true,
    unique: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  fileSize: Number,
  mimeType: {
    type: String,
    default: 'application/pdf'
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloadedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // 30 days TTL
  }
}, {
  timestamps: true,
  collection: 'highlighted_pdfs'
});

module.exports = mongoose.model('HighlightedPdf', highlightedPdfSchema);
