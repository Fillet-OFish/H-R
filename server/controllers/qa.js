const {getQuestions, getAnswers, addQuestion, addAnswer, markQHelpful, reportQuestion, markAHelpful, reportAnswer} = require('../models/qa.js');

const getAllQ = (req, res) => {
  getQuestions({id: '40344', page: '1', count: '100'})
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.getAllQ = getAllQ;