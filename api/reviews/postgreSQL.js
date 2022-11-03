require('dotenv').config();
const postgres = require('postgres');

const sql = postgres({
  username: '',
  database: 'reviews',
  password: '',
  port: process.env.PORT,
  host: process.env.HOST,
});

module.exports = sql;
