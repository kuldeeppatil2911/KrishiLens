const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, default: '' },
  result: {
    disease:        { type: String, default: '' },
    confidence:     { type: Number, default: 0 },
    severity:       { type: String, default: '' },
    recommendation: { type: String, default: '' },
    treatment:      { type: String, default: '' },
    isHealthy:      { type: Boolean, default: false }
  },
  cropName: { type: String, default: '' },
  language: { type: String, default: 'en' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);
