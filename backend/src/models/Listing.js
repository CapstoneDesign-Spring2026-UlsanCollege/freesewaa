const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  condition: { type: String, required: true, trim: true },
  status: { type: String, enum: ['active', 'reserved', 'completed', 'hidden'], default: 'active', index: true },
  location: { type: String, required: true, trim: true },
  city: { type: String, default: 'Ulsan', trim: true },
  region: { type: String, default: 'Nam-gu', trim: true },
  pickup: { type: String, default: 'Pickup only' },
  pickupWindow: { type: String, default: '' },
  notes: { type: String, default: '' },
  urgent: { type: Boolean, default: false },
  images: [{
    url: { type: String, required: true },
    filename: { type: String, default: '' }
  }],
  requestCount: { type: Number, default: 0 },
  saveCount: { type: Number, default: 0 }
}, { timestamps: true });

listingSchema.index({ title: 'text', description: 'text', category: 'text', location: 'text' });

module.exports = mongoose.model('Listing', listingSchema);
