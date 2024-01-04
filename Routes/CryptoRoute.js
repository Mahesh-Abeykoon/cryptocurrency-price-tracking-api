// routes/CryptoRoutes.js
const express = require('express');
const router = express.Router();
const cryptoController = require('../Controllers/CryptoController');

router.get('/predefined-cryptos', cryptoController.getPredefinedCryptos);
router.get('/all-cryptos', cryptoController.getAllCryptos);
router.get('/crypto/:id', cryptoController.getCryptoById);
router.put('/crypto/:id', cryptoController.updateCryptoById);
router.delete('/crypto/:id', cryptoController.deleteCryptoById);
router.post('/crypto', cryptoController.createCrypto);

module.exports = router;
