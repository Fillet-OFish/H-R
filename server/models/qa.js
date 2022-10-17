const axios = require('axios');

// get request
function getQuestions(params, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${params.id}&count=${params.count}`,
    headers: {
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// get request
function getAnswers(q_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/questions/${q_id}/answers`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// post request
function addQuestion(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/questions`,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/questions/${q_id}/answers`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// post request
function addAnswer(q_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/questions/${q_id}/answers`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// put request
function markQHelpful(q_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/questions/:${q_id}/helpful`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// put request
function reportQuestion(q_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/questions/${q_id}/report`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// put request
function markAHelpful(a_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/answers/${a_id}/helpful`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}
// put request
function reportAnswer(a_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/qa/answers/${a_id}/report`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}

module.exports.getQuestions = getQuestions;
module.exports.getAnswers = getAnswers;
module.exports.addQuestion = addQuestion;
module.exports.addAnswer = addAnswer;
module.exports.markQHelpful = markQHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.markAHelpful = markAHelpful;
module.exports.reportAnswer = reportAnswer;