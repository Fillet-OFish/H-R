const { Client } = require('pg');

const client = new Client({
    user: '',
    host: 'localhost',
    database: 'reviews',
    password: '',
    port: 5432,
});

client.connect().then(console.log('database connected using Client'));

module.exports = client;