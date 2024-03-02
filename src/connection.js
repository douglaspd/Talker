const mysql = require('mysql2/promise');

const connect = mysql.createPool({
  host: process.env.MYSQL_HOST || 'db',
  port: process.env.MYSQL_PORT || '3306',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'TalkerDB',
  multipleStatements: true,
});

module.exports = connect;
