const models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      console.log(req);
      const results = await models.fragrances.getAll();
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  post: async (req, res) => {
    try {
      console.log(req);
      const results = await models.fragrances.create(req.body);
      console.log(results);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  // idempotent
  put: async (req, res) => {
    try {
      console.log(req);
      const results = await models.fragrances.update(
        req.query?.id,
        ...Object.keys(req.body),
        ...Object.values(req.body),
      );
      console.log(results);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      console.log(req);
      const results = await models.fragrances.delete(req.query?.id);
      console.log(results);
      res.send(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  }
};
