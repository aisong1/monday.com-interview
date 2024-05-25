const express = require('express');
const dotenv = require('dotenv');

// Middleware
const bodyParser = require('body-parser');

// Router
const router = require('./routes');

dotenv.config();

const app = express();
const serverPort = 8080;
const appPort = 8301;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', `http://localhost:${appPort}`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api', router);

app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});
