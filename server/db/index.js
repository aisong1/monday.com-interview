const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to mysql server: ' + err.stack);
    return;
  }

  if (dbConnection.threadId) {
    console.log('Connection established. Connection ID: ' + dbConnection.threadId);
  }
});

module.exports.dbConnection = dbConnection;
