const axios = require('axios');

async function fetchPredefinedCryptoDetails() {
  const API_KEY = '4a63f40f1e2b9bcef97496c24e72b41d621e98a0fe694966a84fcb196cf9bc01';

  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&apikey=${API_KEY}`
    );

    const cryptoData = response.data.Data.map(crypto => ({
      name: crypto.CoinInfo.Name,
      symbol: crypto.CoinInfo.Name,
      image: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
      current_price: crypto.RAW.USD.PRICE,
      market_cap: crypto.RAW.USD.MKTCAP,
      market_cap_rank: crypto.CoinInfo.Rank,
    }));

    return cryptoData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchPredefinedCryptoDetails,
};
