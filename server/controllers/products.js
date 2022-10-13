const { getProducts, getProduct, getStyles, getRelated } = require('../models/products.js')

module.exports = {
  getAll: function (req, res) {
    getProducts()
      // .then(data => console.log(data.body))
  }
}