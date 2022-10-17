const models = require('../models')

module.exports = {
  getAll: function (req, res) {
    models.products.getProducts()
      .then(result => {res.status(200).send(result.data)})
      .catch(e => console.log('products getAll error', e))
  },
  getOne: function (req, res) {
    models.products.getProduct(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(e => console.log('products getOne error', e))

  },
  getStyles: function (req, res) {
    models.products.getStyles(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(e => console.log('products getStyles error', e))

  },
  getRelated: function (req, res) {
    models.products.getRelated(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(e => console.log('products getRelated error', e.response.data))
  }
}