const db = require('./postgreSQL.js');
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./client/dist'));

// REVIEWS

app.get('reviews/:id', (req, res) => {
  console.log('req.query', req.query);
  let product_id = req.params.id;
  let page = req.query.page ? req.query.page : 1;
  let count = req.query.count ? req.query.count : 5;
  let sort = req.query.sort;
  let offset = (page * count) - count;
  let orderby = '';
  switch(sort) {
    case 'helpful':
      orderby = 'helpfulness desc'
      break;
    case 'newest':
      orderby = 'date desc'
      break;
    case 'relevant':
      orderby = 'date desc, helpfulness desc'
      break;
    default:
      console.log('orderby is not one of the above choices');
      break;
  }

  const query = {
    text: `SELECT * FROM reviews WHERE product_id = $1 ORDER BY $2 LIMIT $3 OFFSET $4 `,
    values: [product_id, orderby, count, offset]
  }
  db.query(query)
  .then((result) => {

    console.log(result.rows[0])
    res.status(200).send(result)
  })
  .catch((error) => console.error(error.stack));
})

// const metaDataQuery = {
//   text: `SELECT json_build_object(
//     'product_id', $1,
//     'ratings', json_build_object('1', oneRating, '2', twoRating, '3', threeRating, '4', fourRating, '5', fiveRating),
//     'recommended', json_build_object('true', trueCount, 'false', falseCount),
//     'characteristics', json_build_object('name', json_build_object('id', id, 'value', value,/))
//     )
//     FROM (
//       SELECT rating FROM reviews
//         WHERE rating = 1 AND product_id = $1
//         COUNT(*) = oneRating
//       SELECT rating FROM reviews
//         WHERE rating = 2 AND product_id = $1
//         COUNT(*) = twoRating
//       SELECT rating FROM reviews
//         WHERE rating = 3 AND product_id = $1
//         COUNT(*) = threeRating
//       SELECT rating FROM reviews
//         WHERE rating = 4 AND product_id = $1
//         COUNT(*) = fourRating
//       SELECT rating FROM reviews
//         WHERE rating = 5 AND product_id = $1
//         COUNT(*) = fiveRating
//     )
//     FROM (
//       SELECT recommend from reviews
//         WHERE recommend = true
//         count(*) = trueCount
//       SELECT recommend from reviews
//         where recommend = false
//         count(*) = falseCount
//     )
//     FROM (
//       SELECT product_id from product_characteristics,
//       SELECT name from product_characteristics,
//       json_build_object(
//         'id', id from product_characteristics,
//         'value', value from reviews_characteristics
//       )
//       FROM characteristic_reviews
//       INNER JOIN
//         product_characteristics
//       ON
//         product_characteristics(id) = reviews_characteristics(characteristic_id)
//       WHERE
//         product_id = $1
//     )
//   `,
//   values: [product_id]
// }

app.get('/reviews/meta/:id', (req, res) => {

  const product_id = req.params.id;

  const result = {
    product_id: product_id,
    ratings: {},
    recommended: {},
    characteristics: {}
  }

  db.query(`SELECT recommend, COUNT(*) FROM reviews WHERE product_id = ${product_id} GROUP by recommend`)
    .then((res) => res.rows.forEach((obj) => {result.recommended[obj.recommend] = Number(obj.count)}))
  db.query(`SELECT rating, COUNT(*) FROM reviews WHERE product_id = ${product_id} GROUP by rating`)
    .then((res) => res.rows.forEach((obj) => {result.ratings[obj.rating] = Number(obj.count)}))
    .then(() => {
      db.query(`SELECT id, name FROM characteristics WHERE product_id = ${product_id}`)
        .then(res => {
          Promise.all(res.rows.map((row) => {
            db.query(`SELECT AVG(value) FROM reviews_characteristics WHERE characteristic_id = ${row.id}`)
              .then((res) => result.characteristics[row.name] = {id: row.id, value: res.rows[0].avg})
          }))
            .then((result) => res.send(result));
            .catch((error) => console.log('error', error));
        })
        .catch((error) => console.log('error', error));
    })
});

app.post('/reviews', (req, res) => {
  let product_id = req.body.product_id;
  let rating = req.body.rating;
  let summary = req.body.summary;
  let body = req.body.body;
  let recommend = req.body.recommend;
  let reviewer_name = req.body.name;
  let reviewer_email = req.body.email;
  let photos = req.body.photos;
  let characteristics = req.body.characteristics;
  let date = new Date().toISOString().split('T')[0]; // today's date

  const query = {
    text: `WITH reviews_added AS (
            INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id AS review_id
          ),
          photos_added AS (
            INSERT INTO photos(review_id, url)
            VALUES ${photos.map((url) => (`(review_id, '${url}')`) ).join(', ')};
          )
          INSERT INTO reviews_characteristics(characteristic_id, review_id, value)
          VALUES ${Object.keys(characteristics).map((key) => (`(${key}, review_id, ${characteristics[key]})`) ).join(', ')}`,
    values: [product_id, rating, summary, date, body, recommend, reviewer_name, reviewer_email]
  }
  db.query(query)
  .then((result) => {
    console.log(result.rows[0]);
    res.status(201).send(result);
  })
  .catch((error) => console.error(error.stack));
});

// PUT
// req.body.review_id = reveiw_id
app.put('/reviews/:review_id/helpful', (req, res) => {
  let review_id = req.params.review_id;
  const query = {
    text: `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1`,
    values: [review_id]
  }
  db.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
});

app.put('/reviews/:review_id/report', (req, res) => {
  let review_id = req.params.review_id;
  const query = {
    text: `UPDATE reviews SET reported = false WHERE id = $1`,
    values: [review_id]
  }
  db.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
});


app.listen(port);
console.log(`Server listening at http://localhost:${port}`);

