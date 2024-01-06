const WebSocket = require('ws');

function websocketMiddleware(server) {
  let wsConnections = [];

  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) => {
    wsConnections.push(ws);
    console.log('WebSocket connection established.');

    ws.on('close', () => {
      wsConnections = wsConnections.filter(conn => conn !== ws);
      console.log('WebSocket connection closed.');
    });
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  return (req, res, next) => {
    req.app.locals.wsConnections = wsConnections;
    next();
  };
}

module.exports = websocketMiddleware;