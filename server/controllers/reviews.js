const models = require('../models')

module.exports = {
  getReview: function (req, res) {
    // models.reviews.getReview(req.params.id, req.params.page, req.params.count)
    models.reviews.getReview(Number(req.params.id), Number(req.params.page), Number(req.params.count))
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
  getMeta: function (req, res) {
    models.reviews.getMeta(req.params.id)
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
  helpfulRev: function (req, res) {
    models.reviews.markRHelpful(req.params.id)
      .then(result => {
        res.status(204).send(result.data);
      })
      .catch(err => console.log(err));
  },
  reportRev: function (req, res) {
    models.reviews.reportReview(req.params.id)
      .then(result => {
        res.status(204).send(result.data);
      })
      .catch(err => console.log(err));
  },
}