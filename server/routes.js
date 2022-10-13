const controllers = require('./controllers/index.js')
const router = require('express').Router()

<<<<<<< HEAD
router.get('/products/:id/related', controllers.products.related)

router.get('/products/:id', controllers.products.product)

// router.get('/', controllers.function)
=======
>>>>>>> master
router.get('/products', controllers.products.getAll)
router.get('/products/:id', controllers.products.getOne)
router.get('/products/:id/styles', controllers.products.getStyles)


router.post('/interactions/:element/:widget/:time')

module.exports = router