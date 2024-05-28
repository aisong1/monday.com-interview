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
      const fragranceId = uuid();

      const sql = 'INSERT INTO `fragrances`(`id`, `name`, `description`, `category`, `image_url`) VALUES (?, ?, ?, ?, ?)';
      const values = [fragranceId, name, description, category, image_url];

      const [results] = await db.connection.execute(sql, values);

      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  },
  update: async (body, id) => {
    try {
      const columnsToSet = Object.keys(body);
      const valuesToSet = Object.values(body);
      let setStatement = '';

      for (const col of columnsToSet) {
        setStatement += `\`${col}\` = ?, `;
      }
      // remove leftover comma and space
      setStatement = setStatement.substring(0, setStatement.length - 2);

      const sql = 'UPDATE `fragrances` SET ' + setStatement +' WHERE `id` = ?';
      const values = [...valuesToSet, id];

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
