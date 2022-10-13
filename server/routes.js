const controllers = require('./controllers/index.js')
const router = require('express').Router()

// router.get('/', controllers.function)
router.get('/products', controllers.products.getAll)
// router.get('/products/:id', controllers.products.getOne)

// router.get('/afjalsflsdkfj', controllers.QnA.getAll)

module.exports = router