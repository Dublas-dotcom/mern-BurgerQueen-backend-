const mongoose = require('mongoose');
// Mongoose schema = blueprint of our menu item data
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Burgers', 'Side and fries', 'Beverages', 'sweets Treats'],
    required: true,
  },
    imageUrl: {
        type: String,
        required: false, // Optional field for image URL
    }
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('MenuItem', menuItemSchema);