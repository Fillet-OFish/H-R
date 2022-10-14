const axios = require('axios');

module.exports = {
  getAll: function(id) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${process.env.TOKENS}`
      },
      params: {
        product_id: id
      }
    }
    return axios(options);
  }
}