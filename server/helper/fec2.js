const axios = require('axios');

let getFEC(callback) {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.campus}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKENS}`
    }
  }
}

module.exports.getFEC = getFEC