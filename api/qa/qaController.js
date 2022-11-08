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

  if(!(req.params.hasOwnProperty('question_id'))) {
    res.status(400);
    res.end('Please provide a question id');
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
    SELECT answers.id AS answer_id, answers.body AS answer_body, answers.date_written AS answer_date, answerer_name, answers.helpful AS answer_helpful, answers.reported AS answer_reported, photos.id AS photo_id, photos.url
    FROM answers
    FULL JOIN photos
    ON photos.answer_id = answers.id
    WHERE answers.question_id = ${req.params.question_id}
      AND answers.reported = False
    ORDER BY answer_id
  `
    .then((results) => {
      const resultObj = {};
      for (let i = 0; i < results.length; i++) {
        if (!(resultObj.hasOwnProperty(results[i].answer_id))) {
          resultObj[results[i].answer_id] = {
            answer_id: results[i].answer_id,
            body: results[i].answer_body,
            date: results[i].answer_date,
            answerer_name: results[i].answerer_name,
            helpfulness: results[i].answer_helpful,
            photos: []
          }
        }

        if (results[i].photo_id) {
          resultObj[results[i].answer_id].photos.push(results[i].url);
        }
      }

      const resultsArr = [];

      for (let key in resultObj) {
        resultsArr.push(resultObj[key]);
      }

      const returnArr = resultsArr.slice((page - 1) * count, ((page - 1) * count) + count);

      res.status(200);
      res.end(JSON.stringify({
        question: String(req.params.question_id),
        page: req.query.page,
        count: req.query.count,
        results: returnArr
      }))
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.addQuestion = async (req, res) => {
  if (!(req.body.hasOwnProperty('product_id')) || !(req.body.hasOwnProperty('body')) || !(req.body.hasOwnProperty('name')) || !(req.body.hasOwnProperty('email'))) {
    res.status(400);
    res.end('Missing info');
    return;
  }

  const dateToday = new Date().toJSON().slice(0, 10);

  await sql`
    INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
    VALUES (DEFAULT, ${req.body.product_id}, ${req.body.body}, ${dateToday}, ${req.body.name}, ${req.body.email}, False, 0)
  `
    .then(() => {
      res.status(201);
      res.end('Created');
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.addAnswer = async (req, res) => {
  if (!(req.params.hasOwnProperty('question_id')) || !(req.body.hasOwnProperty('body')) || !(req.body.hasOwnProperty('name')) || !(req.body.hasOwnProperty('email')) || !(req.body.hasOwnProperty('photos'))) {
    res.status(400);
    res.end('Missing info');
    return;
  }

  const dateToday = new Date().toJSON().slice(0, 10);

  await sql`
    INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES (DEFAULT, ${req.params.question_id}, ${req.body.body}, ${dateToday}, ${req.body.name}, ${req.body.email}, False, 0)
  `
    .then(() => {
      res.status(201);
      res.end('Created');
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.markQuestionHelpful = async (req, res) => {
  if(!(req.params.hasOwnProperty('question_id'))) {
    res.status(400);
    res.end('Missing info');
    return;
  }

  await sql`
    UPDATE questions
    SET helpful = helpful + 1
    WHERE id = ${req.params.question_id};
  `
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.reportQuestion = async (req, res) => {
  if(!(req.params.hasOwnProperty('question_id'))) {
    res.status(400);
    res.end('Missing info');
    return;
  }

  await sql`
    UPDATE questions
    SET reported = True
    WHERE id = ${req.params.question_id};
  `
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.markAnswerHelpful = async (req, res) => {
  if(!(req.params.hasOwnProperty('answer_id'))) {
    res.status(400);
    res.end('Missing info');
    return;
  }

  await sql`
    UPDATE answers
    SET helpful = helpful + 1
    WHERE id = ${req.params.answer_id};
  `
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

exports.reportAnswer = async (req, res) => {
  if(!(req.params.hasOwnProperty('answer_id'))) {
    res.status(400);
    res.end('Missing info');
    return;
  }

  await sql`
    UPDATE answers
    SET reported = True
    WHERE id = ${req.params.answer_id};
  `
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}
