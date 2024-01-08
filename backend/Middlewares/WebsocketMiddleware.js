const WebSocket = require('ws');
const fetchRealTimeCryptoDetails = require('../util/FetchRealTimeCryptoDetails');

function websocketMiddleware(server) {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    fetchRealTimeCryptoDetails(wss);

    console.log('WebSocket connection established.');

    ws.on('close', () => {
      console.log('WebSocket connection closed.');
    });
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  return (req, res, next) => {
    req.app.locals.wsConnections = wss.clients;
    next();
  };
}

module.exports = websocketMiddleware;