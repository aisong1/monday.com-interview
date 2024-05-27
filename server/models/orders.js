const { v4: uuid } = require('uuid');
const { client } = require('../monday');

const { BOARD_ID } = process.env;

module.exports = {
  query: async () => {
    try {
      const query = `
        query {
          boards(ids:[${BOARD_ID}]) {
            name
            
            columns {
              title
              id
              type
            }
            
            groups {
              title
              id
            }
          }
        }
      `;

      const result = await client.post('', JSON.stringify({
        query,
      }));

      console.log('Success! ', result.data);
      return result.data;
    } catch (err) {
      console.error('Failed to perform query: ', err.stack);
    }
  },
  create: async ({ orderQuantity, first_name, last_name, fragrances, board_id }) => {
    // TODO: Implement create method
  },
};
