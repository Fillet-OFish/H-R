const models = require('../models')

module.exports = {
  getAll: function (req, res) {
    models.reviews.getAll(req.params.id)
      .then(result => {res.status(200).send(result.data)})
      .catch(err => console.log(err));
  },
}