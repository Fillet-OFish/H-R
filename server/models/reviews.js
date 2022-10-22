const axios = require('axios');

module.exports = {
  getReview: function(id, page, count) {
    if(id!==null){
      let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews?product_id=${id}&count=${count}&page=${page}`,
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
  }
}