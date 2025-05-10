const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accountType: {
    type: String,
    required: true,
    enum: ['buyer', 'seller'],
    default: 'buyer',
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{10,15}$/, 'Please enter a valid phone number'],
  },
  sellerPackage: {
    packageId: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
      required: function() { return this.accountType === 'seller'; },
    },
    photoUploads: {
      type: Number,
      required: function() { return this.accountType === 'seller'; },
    },
    videoUploads: {
      type: Number,
      required: function() { return this.accountType === 'seller'; },
    },
  },
});

module.exports = mongoose.model('User', userSchema);