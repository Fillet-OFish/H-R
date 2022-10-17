import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AWEntry from './AWEntry.jsx';

// ENTRY OF EACH QUESTION ----------
const QAEntry = (props) => {
  // state will be intially empty array
  const [answers, setAnswers] = useState([]);

  // ADDED FOR PAGINATION ANSWERS -------------------------------
  // No of Records to be displayed on each page
  const [answersPerPage, setAnswersPerPage] = useState(2);
  // Records to be displayed on the current page
  const currentAnswers = answers.slice(0, answersPerPage);


  // add more answers when click on button
  const addAnsw = () => {
    setAnswersPerPage(answersPerPage + 2);
  }

  // make call axios get for answers with the quest id
  const getAnswers = (q_id) => {
    axios.get(`/api/qa/questions/${q_id}/answers`)
    .then((response) => {
      console.log(response.data, 'THIS IS ANSWERS')
      setAnswers(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  // render answers data when qaData or ques states change
  useEffect(() => {
    getAnswers(props.ques.question_id);
  }, [props.qaData, props.ques])


  // render answers data
  return (
    <div>
      <div><strong>Q: {props.ques.question_body}</strong></div>
      <br></br>

      <div className='AContainer'>
        {currentAnswers.length === 0 ? 'No answers yet!' : currentAnswers.map((ans, index) => (
          <AWEntry ans={ans} key={index} />
          // <div><strong>A: {`A: ${ans.body}`}</strong></div>
        ))}
      </div>

      <div>
        {(answers.length === currentAnswers.length) ? "" : (answers.length > 2) ? <a onClick={() => addAnsw()}>Load more answers</a> : ""}
      </div>

      <br></br>
      <br></br>

    </div>
  )
}

export default QAEntry;