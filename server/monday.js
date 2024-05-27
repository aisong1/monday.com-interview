const axios = require('axios');

const { AUTH_TOKEN } = process.env;

if (!AUTH_TOKEN) {
  throw new Error('Must provide Monday.com API Auth Token');
}

const client = axios.create({
  baseURL: 'https://api.monday.com/v2',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AUTH_TOKEN,
    'API-Version' : '2023-04',
  },
});

module.exports = {
  client,
};
