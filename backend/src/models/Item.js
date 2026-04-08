const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Books', 'Furniture', 'Clothing', 'Electronics', 'Kitchen', 'Toys', 'Sports', 'Baby & Kids', 'Other']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['Like New', 'Good', 'Fair']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'claimed'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ category: 1 });
itemSchema.index({ status: 1 });
itemSchema.index({ donor: 1 });

module.exports = mongoose.model('Item', itemSchema);
