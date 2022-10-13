const axios = require('axios');

function getProducts(callback) {
  console.log('made it to getProducts',process.env.campus)
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}

function getProduct(id, callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products/${id}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}

function getStyles(id, callback){
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products/${id}/styles`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}

function getRelated(id, callback){
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products/${id}/related`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${process.env.TOKENS}`
    }
  }
  return axios(options);
}

module.exports.getProducts = getProducts
module.exports.getProduct = getProduct
module.exports.getStyles = getStyles
module.exports.getRelated = getRelated