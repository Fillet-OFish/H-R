const axios = require('axios');

module.exports = {
  getAll: function(id) {
    if(id!==null){
      let options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}/reviews?product_id=${id}&count=${400}`,
        headers: {
          'User-Agent': 'request',
          'Authorization': `${process.env.TOKENS}`
        }
      }
      return axios(options);
    }
  }
}