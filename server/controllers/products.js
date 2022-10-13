const { getProducts, getProduct, getStyles, getRelated } = require('../models/products.js')

module.exports = {
  getAll: function (req, res) {
    getProducts()
      .then(result => res.status(200).send(result.data))
  }
}