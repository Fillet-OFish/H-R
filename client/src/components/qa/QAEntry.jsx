import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AWEntry from './AWEntry.jsx';

// ENTRY OF EACH QUESTION ----------
const QAEntry = (props) => {
  // state will be intially empty array
  const [answers, setAnswers] = useState([]);

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

  return (
    <div>
      <div><strong>Q: {props.ques.question_body}</strong></div>
      {answers.length === 0 ? 'No answers yet!' : answers.map((ans, index) => (
        <AWEntry ans={ans} key={index} />
        // <div><strong>A: {`A: ${ans.body}`}</strong></div>
      ))}
    </div>
  )
}

export default QAEntry;