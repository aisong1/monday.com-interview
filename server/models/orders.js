const { v4: uuid } = require('uuid');
const { client } = require('../monday');

const { BOARD_ID, DROPDOWN_ID } = process.env;

module.exports = {
  query: async () => {
    try {
      const query = `
        query getBoardItems($board_id: ID!) {
          boards(ids:[$board_id]) {
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
        variables: {
          board_id: BOARD_ID,
        },
      }));

      return result.data;
    } catch (err) {
      console.error('Failed to perform query: ', err.stack);
      throw err;
    }
  },
  create: async ({ orderQuantity, first_name, last_name, fragrances }) => {
    try {
      const createItemPromises = [];
      for (let i = 0; i < orderQuantity; i++) {
        const orderId = uuid();
        const query = `
          mutation CreateOrder($board_id: ID!, $item_name: String!, $column_values: JSON, $create_labels_if_missing: Boolean = true) {
            create_item (
              board_id: $board_id,
              item_name: $item_name,
              column_values: $column_values,
              create_labels_if_missing: $create_labels_if_missing
            ) {
              id
              name
            }
          }
        `;

        const promise = client.post('', JSON.stringify({
          query,
          variables: {
            board_id: BOARD_ID,
            item_name: `Order ${first_name}_${last_name}_${orderId}`,
            column_values: JSON.stringify({
              [DROPDOWN_ID]: {
                labels: fragrances,
              }
            }),
          },
        }));

        createItemPromises.push(promise);
      }
      
      const results = await Promise.all(createItemPromises);
      return results;
    } catch (err) {
      console.log('Failed to create order item', err.stack);
      throw err;
    }
  },
};
