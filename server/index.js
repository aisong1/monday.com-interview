const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/orders', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
