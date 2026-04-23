const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled', 'completed'], default: 'pending', index: true },
  note: { type: String, default: '' }
}, { timestamps: true });

requestSchema.index({ listing: 1, requester: 1 }, { unique: true });

module.exports = mongoose.model('Request', requestSchema);
