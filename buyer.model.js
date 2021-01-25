const mongoose = require("mongoose");
const User = require('./user.model');
const buyerSchema = new mongoose.Schema({
  alternateEmail: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },
  telephone: {
    type: String,
    minlength: 6,
    maxlength: 128,
  },
  socialLinks: [
    {
      platform: String,
      link: String,
    },
  ],
  location: {
    type: String,
    trim: true,
    lowercase: true,
  },
  registeredAddress: {
    address: String,
    city: String,
    country: String,
    areaCode: Number,
  },
  operationalAddress: {
    address: String,
    city: String,
    country: String,
    areaCode: Number,
  },
  contactPerson: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
  },
});

const buyer = User.discriminator('buyer',
  buyerSchema);

  module.exports=buyer;