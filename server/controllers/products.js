const models = require('../models/products.js')

module.exports = {
  getAll: function (req, res) {
    getProducts()
      .then(result => res.status(200).send(result.data))
  },
  getRelated: function (req, res) {
    models.getRelated(req.params.id)
      .then(result => res.status(200).send(result.data))
  },
  product: function (req, res) {
    getProduct(req.params.id)
      .then(result => res.status(200).send(result.data))
  }
}