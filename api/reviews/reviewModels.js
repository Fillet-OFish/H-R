const client = require('./pgClient.js');

module.exports = {
  getReview: async function(id, page, count, sort) {

    let product_id = id;
    page = page ? page : 1;
    count = count ? count : 5;
    sort = sort ? sort : 'relevant';

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
        orderby = 'date desc, helpfulness desc'
        break;
    }
    const queryString = `SELECT * FROM reviews WHERE product_id = ${product_id} ORDER BY ${orderby} LIMIT ${count} OFFSET ${offset}`
    let reviews = client.query(queryString);
    return reviews;
  },

  getMeta: function(id) {
    const product_id = id;
    const result = {
      product_id: product_id,
      ratings: {},
      recommended: {},
      characteristics: {}
    };

    return client.query(`SELECT recommend, COUNT(*) FROM reviews WHERE product_id = ${product_id} GROUP by recommend`)
      .then((res) => res.rows.forEach((obj) => {result.recommended[obj.recommend] = Number(obj.count)}))
      .then(() => {
        return client.query(`SELECT rating, COUNT(*) FROM reviews WHERE product_id = ${product_id} GROUP by rating`)
      })
      .then((res) => res.rows.forEach((obj) => {result.ratings[obj.rating] = Number((obj.count))}))
      .then(() => {
        return client.query(`SELECT id, name FROM product_characteristics WHERE product_id = ${product_id}`)
          .then((res) => {
            return Promise.all(res.rows.map((row) => {
              return client.query(`SELECT AVG(value) FROM reviews_characteristics WHERE characteristic_id = ${row.id}`)
                .then((res) => result.characteristics[row.name] = {id: row.id, value: res.rows[0].avg})
            }))
          })
      })
      .then(() => {
        return result;
      })
  },
  addReview: function (obj) {

    const data = {
        'product_id': obj.product_id,
        'rating': obj.rating,
        'summary': obj.summary,
        'body': obj.body,
        'recommend': obj.recommend,
        'name': obj.name,
        'email': obj.email,
        'photos': obj.photos,
        'characteristics': obj.characteristics
      }

    let product_id = data.product_id;
    let rating = data.rating;
    let summary = data.summary;
    let body = data.body;
    let recommend = data.recommend;
    let reviewer_name = data.name;
    let reviewer_email = data.email;
    let photos = data.photos;
    let characteristics = data.characteristics;
    let date = new Date().toISOString().split('T')[0]; // today's date

    const queryString = `WITH reviews_added AS (
                          INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
                          VALUES(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
                          RETURNING id AS review_id
                        ),
                        photos_added AS (
                          INSERT INTO photos(review_id, url)
                          VALUES ${photos.map((url) => (`(review_id, '${url}')`) ).join(', ')};
                        )
                        INSERT INTO reviews_characteristics(characteristic_id, review_id, value)
                        VALUES ${Object.keys(characteristics).map((key) => (`(${key}, review_id, ${characteristics[key]})`) ).join(', ')}`;
    let addReview = client.query(queryString);
    return addReview;
  },

  markRHelpful: function(r_id) {
    let review_id = r_id;
    const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`;
    let helpful = client.query(queryString);
    return helpful;
  },

  reportReview: function(r_id) {
    let review_id = r_id;
    const queryString = `UPDATE reviews SET reported = false WHERE id = ${review_id}`;
    let reported = client.query(queryString);
    return reported;
  },
}