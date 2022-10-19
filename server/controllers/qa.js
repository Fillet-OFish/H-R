const {getQuestions, getAnswers, addQuestion, addAnswer, markQHelpful, reportQuestion, markAHelpful, reportAnswer} = require('../models/qa.js');

const getAllQ = (req, res) => {
  getQuestions({id: req.query.p_id, page: 1, count: 100})
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

const getAllA = (req, res) => {
  getAnswers(req.params.id)
    .then(response => {
      res.status(200).send(response.data.results);
    })
    .catch(err => {
      console.log(err);
    })
}

const postQues = (req, res) => {
  addQuestion(req.body)
    .then(response => {
      res.status(201).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

const postAnsw = (req, res) => {
  addAnswer(req.params.id, req.body)
    .then(response => {
      res.status(201).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

const helpfulQues = (req, res) => {
  markQHelpful(req.params.id)
    .then(response => {
      res.status(204).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

const reportQues = (req, res) => {
  reportQuestion(req.params.id)
    .then(response => {
      res.status(204).send(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports.getAllQ = getAllQ;
module.exports.getAllA = getAllA;
module.exports.postQues = postQues;
module.exports.postAnsw = postAnsw;
module.exports.helpfulQues = helpfulQues;
module.exports.reportQues = reportQues;
