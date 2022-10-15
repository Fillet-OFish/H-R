const models = require('../models')

module.exports = {
  getAll: function (req, res) {
    models.products.getProducts()
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
  getOne: function (req, res) {
    models.products.getProduct(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(err => console.log(err));

  },
  getStyles: function (req, res) {
    models.products.getStyles(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(err => console.log(err));

  },
  getRelated: function (req, res) {
    models.products.getRelated(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch((err) => {console.log(err)})
  },
  product: function (req, res) {
    models.products.getProduct(req.params.id)
      .then(result => res.status(200).send(result.data))
      .catch(err => console.log(err));
  }
}