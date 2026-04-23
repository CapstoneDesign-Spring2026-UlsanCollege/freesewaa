const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, default: '', trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  passwordHash: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  city: { type: String, default: 'Ulsan' },
  region: { type: String, default: 'Nam-gu' },
  bio: { type: String, default: '' },
  pickupAvailability: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: {
    theme: { type: String, enum: ['light', 'dark'], default: 'dark' },
    language: { type: String, default: 'English' },
    notifications: { type: Boolean, default: true },
    pickupReminders: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false }
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ phone: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', userSchema);
