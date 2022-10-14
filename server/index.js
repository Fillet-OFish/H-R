const express = require("express")
const router = require('./routes.js')
// const cartRouter = require('./routes/cartRouter.js')
// const interactionsRouter = require('./routes/interactionsRouter.js')
// const productsRouter = require('./routes/productsRouter.js')
// const qaRouter = require('./routes/qaRouter.js')
// const reviewsRouter = require('./routes/reviewsRouter.js')
const path = require("path");
const app = express();

require('dotenv').config();

app.use(express.json())

app.use(express.static('./client/dist'));

app.use('/api', router) // here ('/api)
// app.use('/api/products', productsRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/interactionsRouter', interactionsRouter)
// app.use('/api/qa', qaRouter)
// app.use('/api/reviews'. reviewsRouter)

const PORT = 3000

app.listen(PORT);
console.log(`server listening at http://localhost:${PORT}`)

