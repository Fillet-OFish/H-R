const models = require('../models')

module.exports = {
  getReview: function (req, res) {
    models.reviews.getReview(req.params.id, req.params.page, req.params.count)
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
  getMeta: function (req, res) {
    models.reviews.getMeta(req.params.id)
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  }
}