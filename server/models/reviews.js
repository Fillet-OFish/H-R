const axios = require('axios');

module.exports = {
  getReview: function(id, page, count) {
    if(id!==null){
      let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews?product_id=${id}&page=${page}&count=${count}`,
        headers: {
          'User-Agent': 'request',
          'Authorization': `${process.env.TOKENS}`
        }
      }
      return axios(options);
    }
  },
  getMeta: function(id) {
    if(id!==null){
      let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews/meta?product_id=${id}`,
        headers: {
          'User-Agent': 'request',
          'Authorization': `${process.env.TOKENS}`
        }
      }
      return axios(options);
    }
  },
  markRHelpful: function(r_id) {
    let options = {
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews/${r_id}/helpful`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  },
  reportReview: function(r_id) {
    let options = {
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews/${r_id}/report`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  },
}