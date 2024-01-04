const axios = require('axios');
const Crypto = require('../Models/CryptoModel');
const sendUpdates = require('../util/SendUpdates');
const { fetchPredefinedCryptoDetails } = require('../util/FetchPredefinedCryptoDetails');

exports.getPredefinedCryptos = async (req, res) => {
    try {
      const data = await fetchPredefinedCryptoDetails();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports.createCrypto = async (req, res) => {
    const newCrypto = req.body;
  
    try {
      const crypto = await Crypto.create(newCrypto);
      sendUpdates(req.app.locals.wsConnections, crypto); // Pass WebSocket connections directly
      res.json(crypto);
    } catch (error) {
      console.error('Error creating data in database:', error);
      res.status(500).send('Internal Server Error');
    }
  };

exports.getAllCryptos = async (req, res) => {
  try {
    const cryptocurrencies = await Crypto.find();
    res.json(cryptocurrencies);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getCryptoById = async (req, res) => {
  const cryptoId = req.params.id;

  try {
    const crypto = await Crypto.findById(cryptoId);
    if (crypto) {
      res.json(crypto);
    } else {
      res.status(404).send('Cryptocurrency not found');
    }
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateCryptoById = async (req, res) => {
  const cryptoId = req.params.id;
  const updatedCrypto = req.body;

  try {
    const crypto = await Crypto.findByIdAndUpdate(cryptoId, updatedCrypto, { new: true });
    if (crypto) {
      sendUpdates(req.app.locals.wsConnections, crypto);
      res.json(crypto);
    } else {
      res.status(404).send('Cryptocurrency not found');
    }
  } catch (error) {
    console.error('Error updating data in database:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteCryptoById = async (req, res) => {
  const cryptoId = req.params.id;

  try {
    const crypto = await Crypto.findByIdAndDelete(cryptoId);
    if (crypto) {
      sendUpdates(req.app.locals.wsConnections, { action: 'delete', data: crypto });
      res.send('Cryptocurrency deleted successfully');
    } else {
      res.status(404).send('Cryptocurrency not found');
    }
  } catch (error) {
    console.error('Error deleting data from database:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.sendUpdates = sendUpdates;
