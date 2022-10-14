const models = require('../models')

module.exports = {
  getAll: function (req, res) {
    models.cart.getAll()
      .then(result => {res.status(200).send(result.data)})
      .catch(e => console.log('getAll error', e.response.data))
  },
  postOne: function (req, res) {
    models.cart.post(req.body.sku_id, req.body.count)
      .then(result => {res.status(201).send(result.data)})
      .catch(e => console.log('postOne error', e.response.data))
  }
}