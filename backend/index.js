const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const websocketMiddleware = require('./Middlewares/WebsocketMiddleware');
const authRoute = require('./Routes/AuthRoute');
const cryptoRoute = require('./Routes/CryptoRoute');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });
require('dotenv').config();

const PORT = 5001;
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB is Connected Successfully'))
  .catch((error) => console.error(error));

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(websocketMiddleware(server));

app.use('/', authRoute);
app.use('/', cryptoRoute);

module.exports = server;