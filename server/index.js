

const express = require("express")
const path = require("path");
const app = express();

app.use(express.json())

app.use(express.static('./client/dist')); //

const PORT = 3000

app.listen(PORT);
console.log(`server listening at http://localhost:${PORT}`)

