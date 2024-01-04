const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const websocketMiddleware = require('./Middlewares/WebsocketMiddleware');
const authRoute = require('./Routes/AuthRoute');
const cryptoRoute = require('./Routes/CryptoRoute');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = 5001;
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB is Connected Successfully'))
  .catch((error) => console.error(error));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.json());
app.use(websocketMiddleware(server)); 

app.use('/', authRoute);
app.use('/', cryptoRoute);

module.exports = server;
