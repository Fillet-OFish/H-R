const axios = require('axios');

module.exports = {
  getAll: function() {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/cart`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      }
    }
    return axios(options);
  },
  post: function(id, count) {
    let options = {
      method: 'POST',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/cart`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`,
      },

      data: {
        'sku_id': parseInt(id)
      }
    }
    return axios(options);
  }
}