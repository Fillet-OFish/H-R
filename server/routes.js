const controllers = require('./controllers/index.js');
const router = require('express').Router();

// products
router.get('/products/:id/related', controllers.products.getRelated)
router.get('/products/:id', controllers.products.getOne)
router.get('/products', controllers.products.getAll)
router.get('/products/:id/styles', controllers.products.getStyles)
// router.get('/reviews/:id', controllers.reviews.getAll)

// reviews ----------
//get info
router.get('/reviews/:id/:page/:count/:sort', controllers.reviews.getReview)
router.get('/reviews/meta/:id', controllers.reviews.getMeta)
//post data
router.post('/reviews', controllers.reviews.postRev)
// change helpfulness and report
router.put('/reviews/:id/helpful', controllers.reviews.helpfulRev);
router.put('/reviews/:id/report', controllers.reviews.reportRev);


// interactions
router.post('/interactions/:element/:widget/:time')

// cart
router.get('/cart', controllers.cart.getAll)
router.post('/cart', controllers.cart.postOne)

// QUESTIONS AND ANSWERS REQUESTS ---------------------------------------
// get all info
router.get('/qa/questions', controllers.qa.getAllQ);
router.get('/qa/questions/:id/answers', controllers.qa.getAllA);
// post new info
router.post('/qa/questions', controllers.qa.postQues);
router.post('/qa/questions/:id/answers', controllers.qa.postAnsw);
// change helpfulness and report
router.put('/qa/questions/:id/helpful', controllers.qa.helpfulQues);
router.put('/qa/questions/:id/report', controllers.qa.reportQues);

router.put('/qa/answers/:id/helpful', controllers.qa.helpfulAnsw);
router.put('/qa/answers/:id/report', controllers.qa.reportAnsw);


module.exports = router;