import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AWEntry from './AWEntry.jsx';

// ENTRY OF EACH QUESTION ----------
const QAEntry = (props) => {
  // state will be intially empty array
  const [answers, setAnswers] = useState([]);

  // PAGINATION FOR ANSWERS -------------------------------
  // No of Records to be displayed on each page
  const [answersPerPage, setAnswersPerPage] = useState(2);
  // Records to be displayed on the current page
  const currentAnswers = answers.slice(0, answersPerPage);

  // add more answers when click on button
  const addAnsw = () => {
    setAnswersPerPage(answersPerPage + 2);
  }
  // -------------------------------------------------------


  // make an axios get call for answers with each individual quest id
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

  // make an axios put request to mark questions as helpful
  const helpfulQues = (q_id) => {
    axios.put(`/api/qa/questions/${q_id}/helpful`)
    .then((response) => {
      console.log('Successful put for helpfulQues!')
    })
    .catch(err => {
      console.log(err);
    })
  }

  // make an axios put request to report questions
  const reportQues = (q_id) => {
    axios.put(`/api/qa/questions/${q_id}/report`)
    .then((response) => {
      console.log('Successful put for reportQues!')
    })
    .catch(err => {
      console.log(err);
    })
  }

  // render answers data when qaData or ques states change
  useEffect(() => {
    getAnswers(props.ques.question_id);
    console.log(props.ques);
  }, [props.qaData, props.ques])

  // render answers data with an answers entry component and a button for more answers
  return (
    <div className='QContainer2'>
      {/* set each question - with helpful and add answer properties --------------- */}
      <div><strong>Q: {props.ques.question_body}</strong>
        {/* question on helpfulness */}
        <label style={{float: 'right'}} className='user_info' >Helpful? <a className='questions-and-answers' onClick={() => helpfulQues(props.ques.question_id)}>Yes</a> ({props.ques.question_helpfulness}) |
        {/* reporting question */}
        <a className='questions-and-answers' onClick={() => reportQues(props.ques.question_id)}>Report</a> |
        {/* adding an answer to question */}
        <a className='questions-and-answers' onClick={() => {
          props.setModalAnswOn(!props.modalAnswOn);
          props.setQID(props.ques);
          }}>Add Answer</a>
        </label>
      </div>
      <br></br>

      {/* set each answer ----------------- */}
      <div className='AContainer'>
        {currentAnswers.length === 0 ? 'No answers yet!' : currentAnswers.map((ans, index) => (
          <AWEntry ans={ans} key={index} index={index} setImage={props.setImage} setModalOn={props.setModalOn} modalOn={props.modalOn} />
          // <div><strong>A: {`A: ${ans.body}`}</strong></div>
        ))}
      </div>

      {/* display 'load more answers' button depending on condition --------------- */}
      <div>
        {(answers.length === currentAnswers.length) ? "" : (answers.length > 2) ? <a className='questions-and-answers' onClick={() => addAnsw()}>Load more answers</a> : ""}
      </div>

      <br></br>

    </div>
  )
}

export default QAEntry;