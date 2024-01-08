const WebSocket = require('ws');

const cryptocurrencies = [
  { symbol: 'BTC', name: 'Bitcoin', price: 0, marketCap:0, change24h:0 },
  { symbol: 'ETH', name: 'Ethereum', price: 0 },
  { symbol: 'USDT', name: 'Tether USD', price: 0 },
  { symbol: 'BNB', name: 'BNB', price: 0 },
  { symbol: 'SOL', name: 'Solana', price: 0 },
  { symbol: 'XRP', name: 'XRP', price: 0 },
  { symbol: 'USDC', name: 'USDC', price: 0 },
];

async function fetchRealTimeCryptoDetails(wss) {
    const API_KEY = "405ecf786f630bd7a34148d9052e105b20aa048eef60cb977e0f14aab7dd719d"; 
    const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

  socket.addEventListener('open', () => {
    console.log('WebSocket connection opened');

    const subscribeMessages = cryptocurrencies.map(crypto => ({
      action: 'SubAdd',
      subs: [`5~CCCAGG~${crypto.symbol}~USD`],
    }));

    subscribeMessages.forEach(message => socket.send(JSON.stringify(message)));
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.TYPE === '5' && message.MARKET === 'CCCAGG') {
      const updatedCrypto = cryptocurrencies.find(crypto => crypto.symbol === message.FROMSYMBOL);

      if (updatedCrypto) {
        updatedCrypto.price = message.PRICE;

        const sortedCryptos = cryptocurrencies.slice().sort((a, b) => b.price - a.price);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(sortedCryptos));
          }
        });
      }
    }
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
  });
}

module.exports = fetchRealTimeCryptoDetails;
