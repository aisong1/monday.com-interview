const db = require('../db');
const { v4: uuid } = require('uuid');

module.exports = {
  getAll: async () => {
    try {
      const [results] = await db.connection.query(
        'SELECT * FROM fragrances'
      );

      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  create: async ({ name, description, category, image_url }) => {
    try {
      const id = uuid();

      const sql = 'INSERT INTO `fragrances`(`id`, `name`, `description`, `category`, `image_url`) VALUES (?, ?, ?, ?, ?)';
      const values = [id, name, description, category, image_url];

      const [results] = await db.connection.execute(sql, values);

      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  },
  // is this expected to update n number of columns at once? or just one column at a time?
  update: async (id, column, value) => {
    try {
      const sql = 'UPDATE `fragrances` SET `' + column + '` = ? WHERE `id` = ?';
      const values = [value, id];

      const [results] = await db.connection.execute(sql, values);
      
      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (id) => {
    try {
      const sql = 'DELETE FROM `fragrances` WHERE `id` = ?';
      const values = [id];

      const [results] = await db.connection.execute(sql, values);
      
      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  }
};
