<<<<<<< HEAD
const models = require('../models/products.js')
=======
const models = require('../models')
>>>>>>> master

module.exports = {
  getAll: function (req, res) {
    models.products.getProducts()
      .then(result => {console.log('controller',result.data);res.status(200).send(result.data)})
  },
  getOne: function (req, res) {
    models.products.getProduct(req.params.id)
      .then(result => res.status(200).send(result.data))
  },
  getStyles: function (req, res) {
    models.products.getStyles(req.params.id)
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