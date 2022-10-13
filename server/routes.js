const controllers = require('./controllers/index.js')
const router = require('express').Router()

router.get('/products', controllers.products.getAll)
router.get('/products/:id', controllers.products.getOne)
router.get('/products/:id/styles', controllers.products.getStyles)


module.exports = router