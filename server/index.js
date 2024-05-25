const express = require('express');
const dotenv = require('dotenv');

// Middleware
const bodyParser = require('body-parser');

// Router
const router = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
