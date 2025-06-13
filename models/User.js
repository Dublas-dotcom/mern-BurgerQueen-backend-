const mongoose = require('mongoose');

// Mongoose schema = blueprint of our user data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
