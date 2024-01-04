const axios = require('axios');
const { secretToken } = require('./SecretToken');
const { sendUpdate } = require('./SendUpdates');
const { fetchPredefinedCryptoDetails } = require('./FetchPredefinedCryptoDetails');

module.exports = {
  secretToken,
  sendUpdate,
  fetchPredefinedCryptoDetails
};
