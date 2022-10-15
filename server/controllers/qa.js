const {getQuestions, getAnswers, addQuestion, addAnswer, markQHelpful, reportQuestion, markAHelpful, reportAnswer} = require('../models/qa.js');

const getAllQ = (req, res) => {
  // console.log(req.query.p_id, '------------------------------------')
  getQuestions({id: req.query.p_id, page: 1, count: 100})
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

const getAllA = (req, res) => {
  // console.log(req.params.id, '----------------------------- ANSWERS')
  getAnswers(req.params.id)
    .then(response => {
      // console.log(response.data, '----------------------------- ANSWERS')
      // console.log(response.data.results, '----------------------------- ANSWERS')
      res.status(200).send(response.data.results);
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.getAllQ = getAllQ;
module.exports.getAllA = getAllA;