const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

app.listen(port);
console.log(`Server listening at http://localhost:${port}`);