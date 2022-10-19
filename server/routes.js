const controllers = require('./controllers/index.js');
const router = require('express').Router();

// products
router.get('/products/:id/related', controllers.products.getRelated)
router.get('/products/:id', controllers.products.getOne)
router.get('/products', controllers.products.getAll)
router.get('/products/:id/styles', controllers.products.getStyles)
router.get('/reviews/:id', controllers.reviews.getAll)

// reviews
router.get('/reviews/:id', controllers.reviews.getAll)

// interactions
router.post('/interactions/:element/:widget/:time')

// cart
router.get('/cart', controllers.cart.getAll)
router.post('/cart', controllers.cart.postOne)

// QUESTIONS AND ANSWERS REQUESTS ---------------------------------------
router.get('/qa/questions', controllers.qa.getAllQ);
router.get('/qa/questions/:id/answers', controllers.qa.getAllA);

router.post('/qa/questions', controllers.qa.postQues);
router.post('/qa/questions/:id/answers', controllers.qa.postAnsw);

router.put('/qa/questions/:id/helpful', controllers.qa.helpfulQues);
router.put('/qa/questions/:id/report', controllers.qa.reportQues);

module.exports = router;