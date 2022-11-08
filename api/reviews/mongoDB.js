const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews');

const reviewSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: String,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: [{photo_id: Number, url: String}]
});

const photoSchema = mongoose.Schema({
  id: Number,
  review_id: Number,
  url: String
});

const characteristicSchema = mongoose.Schema({
  id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number
});

const metaDataSchema = mongoose.Schema({
  id: Number,
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  recommend_id: Number,
  characteristics: {
    Size: {
      id: Number,
      value: Number,
    },
    Width: {
      id: Number,
      value: Number,
    },
    Comfort: {
      id: Number,
      value: Number,
    }
  }
});

const Review = mongoose.model('Reviews', reviewSchema);
const Photo = mongoose.model('Photo', photoSchema);
const Characteristic = mongoose.model('Characteristic', characteristicSchema);
const MetaData = mongoose.model('MetaData', metaDataSchema);