const axios = require('axios');

function getProducts(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKENS}`
    }
  }
  return axios(options);
}

function getProducts(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews/`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKENS}`
    }
  }
  return axios(options);
}

module.exports.getProducts = getProducts