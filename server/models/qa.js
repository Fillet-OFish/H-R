const axios = require('axios');

function getQuestions(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/questions`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
}
function getAnswers(q_id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/questions/${q_id}/answers`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
}
function getQuestions(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/questions`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
}
function getQuestions(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/questions`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
}