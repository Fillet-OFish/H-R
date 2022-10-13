const controllers = require('./controllers/index.js')
const router = require('express').Router()

router.get('/products/:id/related', controllers.products.related)

router.get('/products/:id', controllers.products.product)

// router.get('/', controllers.function)
router.get('/products', controllers.products.getAll)
// router.get('/products/:id', controllers.products.getOne)

// router.get('/afjalsflsdkfj', controllers.QnA.getAll)

router.post('/interactions/:element/:widget/:time')

module.exports = router