const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/qa');
}

const photoSchema = new mongoose.Schema({
  id: Integer,
  url: String
})

const answerSchema = new mongoose.Schema({
  id: Integer,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  helpfulness: Integer,
  reported: Boolean,
  photos: [photoSchema]
})

const questionSchema = new mongoose.Schema({
  id: Integer,
  product_id: Integer,
  body: String,
  date: Date,
  asker_name: String,
  asker_email: String,
  helpfulness: Boolean,
  answers: [answerSchema]
});

const Question = new mongoose.model('Question', questionSchema);
const Answer = new mongoose.model('Answer', answerSchema);
const Photo = new mongoose.model('Photo', photoSchema);


const addQuestion = (data) => {
  const newQuestion = new Question(data);
  newQuestion.save(err => console.log(err));
}

const addAnswer = (data) => {
  const newAnswer = new Answer(data);
  Question.findOne({id: data.question_id}, (err, question) => {
      question.answers.push(newAnswer);
    })
}

const addPhoto = (data) => {
  const newPhoto = new Photo(data);
  Answer.findOne({id: data.answer_id}, (err, answer) => {
    answer.photos.push(newPhoto);
  })
}
