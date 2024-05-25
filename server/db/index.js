const mysql = require('mysql2/promise');

const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'candleOrders',
  });
};

module.exports = {
  connection: {
    query: async (sql) => {
      const conn = await createConnection();
      const [rows, fields] = await conn.query(sql);
      await conn.end();

      return [rows, fields];
    },
    execute: async (sql, values) => {
      const conn = await createConnection();
      const [rows, fields] = await conn.execute(sql, values);
      await conn.end();

      return [rows, fields];
    },
  },
};
