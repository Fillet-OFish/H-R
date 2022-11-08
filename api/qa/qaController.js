const {sql} = require('./db/sqlDb.js')

exports.getQuestions = async (req, res) => {

  if(!(req.query.hasOwnProperty('product_id'))) {
    res.status(400);
    res.end('Please provide a product id');
    return;
  }

  let page = 1;
  let count = 5;
  if (req.query.hasOwnProperty('page')) {
    if (Number.isInteger(Number(req.query.page))) {
      page = Number(req.query.page);
    } else {
      res.status(400);
      res.end('Page must be an integer!');
      return;
    }
  }
  if (req.query.hasOwnProperty('count')) {
    if (Number.isInteger(Number(req.query.count))) {
      count = Number(req.query.count);
    } else {
      res.status(400);
      res.end('Count must be an integer!');
      return;
    }
  }

  await sql`
    SELECT product_id, questions.id AS question_id, questions.body AS question_body, questions.date_written AS question_date, asker_name, questions.helpful AS question_helpful, answers.id AS answer_id, answers.body AS answer_body, answers.date_written AS answer_date, answerer_name, answers.helpful AS answer_helpful, answers.reported AS answer_reported, photos.id AS photo_id, photos.url
    FROM questions
    FULL JOIN answers
    ON answers.question_id = questions.id
    FULL JOIN photos
    ON photos.answer_id = answers.id
    WHERE product_id = ${req.query.product_id}
      AND questions.reported = False
    ORDER BY question_id
  `
    .then(results => {
      const resultObj = {}
      for (let i = 0; i < results.length; i++) {
        if (!(resultObj.hasOwnProperty(results[i].question_id))) {
          resultObj[results[i].question_id] = {
            question_id: results[i].question_id,
            question_body: results[i].question_id,
            question_date: results[i].question_date,
            asker_name: results[i].asker_name,
            question_helpfulness: results[i].question_helpful,
            reported: false,
            answers: {}
          }
        }

        if (results[i].answer_id !== null && !(resultObj[results[i].question_id].answers.hasOwnProperty(results[i].answer_id))) {
          resultObj[results[i].question_id].answers[results[i].answer_id] = {
            id: results[i].answer_id,
            body: results[i].answer_body,
            date: results[i].answer_date,
            answerer_name: results[i].answerer_name,
            helpfulness: results[i].answer_helpful,
            photos: []
          }
        }

        if (results[i].photo_id) {
          resultObj[results[i].question_id].answers[results[i].answer_id].photos.push(results[i].url)
        }
      }

      const resultsArr = [];
      for (let key in resultObj) {
        resultsArr.push(resultObj[key]);
      }

      const returnArr = resultsArr.slice((page - 1) * count, ((page - 1) * count) + count)

      res.status(200);
      res.end(JSON.stringify({
        product_id: req.query.product_id,
        results: returnArr
      }))
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.getAnswers = async (req, res) => {
  res.status(200);
  res.end('Hello')
}