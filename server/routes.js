const controllers = require('./controllers/index.js');
const router = require('express').Router();

router.get('/products', controllers.products.getAll)
router.get('/products/:id', controllers.products.getOne)
router.get('/products/:id/styles', controllers.products.getStyles)


router.get('/qa/questions', controllers.qa.getAllQ);
router.get('/qa/questions/:id/answers', controllers.qa.getAllA);

module.exports = router;