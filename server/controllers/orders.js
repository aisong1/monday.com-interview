const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const results = await models.orders.query();
      res.send(JSON.stringify(results));
    } catch (err) {
      throw err;
    }
  },
  post: async (req, res) => {
    try {
      const results = await models.orders.create(req.body);
      console.debug(results);
      res.status(201);
      res.end();
    } catch (err) {
      throw err;
    }
  },
};
