const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const results = await models.orders.getAll();
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
  // idempotent
  put: async (req, res) => {
    try {
      const results = await models.orders.update(
        req.query?.id,
        ...Object.keys(req.body),
        ...Object.values(req.body),
      );
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      const results = await models.orders.delete(req.query?.id);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  }
};
