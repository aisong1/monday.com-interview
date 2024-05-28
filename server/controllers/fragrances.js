const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const results = await models.fragrances.getAll();
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  post: async (req, res) => {
    try {
      const results = await models.fragrances.create(req.body);
      res.status(201);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  // idempotent
  put: async (req, res) => {
    try {
      const results = await models.fragrances.update(req.body, req.query.id);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      const results = await models.fragrances.delete(req.query?.id);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  }
};
