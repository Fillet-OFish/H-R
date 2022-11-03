const fs = require('fs');
const readline = require('readline');
const db = require('./sqlDb.js');
const questionsData = '/Users/ryanleigh/Desktop/Repos/Frontend-Capstone-Ecommerce/api/qa/rawData/questions.csv';

const parseCSV = async (fileName) => {
  const data = String(fs.readFileSync(fileName));
  console.log('After file read')
  const lineArr = data.split('\n');
  console.log('after split')
  const columns = 'id, product_id, body, date_written, asker_name, asker_email, reported, helpfulness';
  lineArr.slice(1).forEach(async (line) => {
    await db.sql`INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpfulness) VALUES (${line.split(',').join(', ')});`
    .then(() => console.log(line))
    .catch(err => console.log(err));
  });

  /*await db.sql`INSERT INTO questions (id, product_id, body, date, asker_name, asker_email, reported, helpfulness)
    VALUES(1, 1, 'What fabric is the top made of?', 1595884714409, 'yankeelover', 'first.last@gmail.com', 0, 1);
  `*/
}

parseCSV(questionsData);
