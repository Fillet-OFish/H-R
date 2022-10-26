const models = require('../models')

module.exports = {
  getReview: function (req, res) {
    console.log(req.params, 'sorting backend')
    // models.reviews.getReview(req.params.id, req.params.page, req.params.count)
    models.reviews.getReview(Number(req.params.id), Number(req.params.page), Number(req.params.count), req.params.sort)
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
  getMeta: function (req, res) {
    models.reviews.getMeta(req.params.id)
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
  postRev: function (req, res) {
    console.log(req.body, 'POSTREV IN ---')
    models.reviews.addReview(req.body)
      .then(response => {
        res.status(201).send(response.data);
      })
      .catch(err => {
        console.log(err);
      })
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