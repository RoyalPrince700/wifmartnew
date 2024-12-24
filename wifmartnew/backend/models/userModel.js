const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilePic: String,
    role: {
      type: String,
      default: 'GENERAL',
    },
    location: String, // Add this field
    hostel: String,    // Add this field
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('User', userSchema); // Updated model name

module.exports = userModel

