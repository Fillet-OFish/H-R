const axios = require('axios');

module.exports = {
  getProducts: function() {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  },
  getProduct: function(id) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products/${id}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  },
  getStyles: function(id) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products/${id}/styles`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  },
  getRelated: function(id) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/products/${id}/related`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  }
}