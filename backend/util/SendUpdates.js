function sendUpdates(connections, data) {
    connections.forEach(connection => {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify(data));
      }
    });
  }
  
  module.exports = sendUpdates;
  