const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const results = await models.orders.query();
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  post: async (req, res) => {
    try {
      const results = await models.orders.create(req.body);
      res.status(201);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
};
