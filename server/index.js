const express = require("express");
const router = require('./routes.js');
const path = require("path");
const app = express();

require('dotenv').config();

app.use(express.json());

app.use(express.static('./client/dist'));

app.use('/api', router); // here ('/api)

const PORT = 3000;

app.listen(PORT);
console.log(`server listening at http://localhost:${PORT}`)

