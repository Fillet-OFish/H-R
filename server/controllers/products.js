const models = require('../models')

module.exports = {
  getAll: function (req, res) {
    models.products.getProducts()
      .then(result => {res.status(200).send(result.data)})
      .catch(e => console.log('products getAll error', e.response.data))
  },
  getOne: function (req, res) {
    let id = req.params.id || { id: '40344' }
    console.log('get one', req.params)
    models.products.getProduct(id)
      .then(result => res.status(200).send(result.data))
      .catch(e => console.log('products getOne error', e.response.data))

  },
  getStyles: function (req, res) {
      models.products.getStyles(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(e => console.log('products getStyles error', e.response.data))

  },
  getRelated: function (req, res) {
    models.products.getRelated(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(e => console.log('products getRelated error', e.response.data))
  }
}