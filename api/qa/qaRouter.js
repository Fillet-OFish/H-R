const router = require('express').Router();
const qaController = require('./qaController.js')

router.get('/questions', qaController.getQuestions);
router.get('/questions/:question_id/answers', qaController.getAnswers);
router.post('/questions', qaController.addQuestion);
router.post('/questions/:question_id/answers', qaController.addAnswer);
router.put('/questions/:question_id/helpful', qaController.markQuestionHelpful);
router.put('/questions/:question_id/report', qaController.reportQuestion);
router.put('/answers/:answer_id/helpful', qaController.markAnswerHelpful);
router.put('/answers/:answer_id/report', qaController.reportAnswer);

module.exports = router;
