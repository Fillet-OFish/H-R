const models = require('../models')

module.exports = {
  getAll: function (req, res) {
    models.products.getProducts()
      .then(result => {res.status(200).send(result.data)})
  },
  getOne: function (req, res) {
    models.products.getProduct(req.params.id)
      .then(result => res.status(200).send(result.data))
  },
  getStyles: function (req, res) {
    models.products.getStyles(req.params.id)
      .then(result => res.status(200).send(result.data))
  }
}