// models/CryptoModel.js
const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add other fields as needed
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
