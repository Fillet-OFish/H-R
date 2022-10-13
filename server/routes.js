const controllers = require('./controllers/index.js');
const router = require('express').Router();

// router.get('/', controllers.function)
router.get('/products', controllers.products.getAll);
// router.get('/products/:id', controllers.products.getOne)


router.get('/qa/questions', controllers.qa.getAllQ);

module.exports = router;