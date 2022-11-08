const router = require('express').Router();
const qaController = require('./qaController.js')

router.get('/questions', qaController.getQuestions);
router.get('/answers', qaController.getAnswers);

module.exports = router;
