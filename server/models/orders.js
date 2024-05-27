const db = require('../db');
const { v4: uuid } = require('uuid');

module.exports = {
  getAll: async () => {
    try {
      const [results] = await db.connection.query(
        `
          SELECT orders.id, orders.first_name, orders.last_name, fragrances.name
          FROM orders
          LEFT JOIN orders_fragrances ON orders.id=orders_fragrances.order_id
          LEFT JOIN fragrances ON orders_fragrances.fragrance_id=fragrances.id
        `
      );

      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  create: async ({ orderQuantity, first_name, last_name, fragrances, board_id }) => {
    try {
      const createOrderPromises = [];
      const createOrdersFragrancesPromises = [];

      for (let i = 0; i < orderQuantity; i++) {
        const orderId = uuid();
        const sql = 'INSERT INTO `orders`(`id`, `first_name`, `last_name`, `board_id`) VALUES (?, ?, ?, ?)';
        const values = [orderId, first_name, last_name, board_id];

        createOrderPromises.push(db.connection.execute(sql, values));

        for (const key in fragrances) {
          const fragrance = fragrances[key];
          const sql = 'INSERT INTO `orders_fragrances`(`order_id`, `fragrance_id`) VALUES (?, ?)'
          const values = [orderId, fragrance.id];

          createOrdersFragrancesPromises.push(db.connection.execute(sql, values));
        }
      }

      const orderResults = await Promise.all(createOrderPromises);
      const orderFragranceResults = await Promise.all(createOrdersFragrancesPromises);
      console.debug(orderResults, orderFragranceResults);
      return [orderResults, orderFragranceResults];
    } catch (err) {
      console.log(err);
    }
  },
  // is this expected to update n number of columns at once? or just one column at a time?
  update: async (id, column, value) => {
    try {
      const sql = 'UPDATE `orders` SET `' + column + '` = ? WHERE `id` = ?';
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
      const sql = 'DELETE FROM `orders` WHERE `id` = ?';
      const values = [id];

      const [results] = await db.connection.execute(sql, values);
      
      console.debug(results);
      return results;
    } catch (err) {
      console.log(err);
    }
  }
};
