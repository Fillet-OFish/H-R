import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AWEntry from './AWEntry.jsx';
import { useDarkMode } from '../../DarkMode.jsx'

// ENTRY OF EACH QUESTION ----------
const QAEntry = (props) => {
  const darkMode = useDarkMode();
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
      // console.log(response.data, 'THIS IS ANSWERS')
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
    // console.log(props.ques);
  }, [props.qaData, props.ques])

  // render answers data with an answers entry component and a button for more answers
  return (
    <>
    <div className='QAContainer'>
      {/* set each question - with helpful and add answer properties --------------- */}
      <span className='QA-left'>
        Q:
      </span>
      <span className="Q-right">
        <span>{props.ques.question_body}</span>
        {/* question on helpfulness */}
        <span className={`user_info ${darkMode ? 'user_info-dark' : null}`} style={{float:'right'}}>
          Helpful?
          &nbsp;
          <a className='questions-and-answers' onClick={() => helpfulQues(props.ques.question_id)}>Yes</a> ({props.ques.question_helpfulness})
          &nbsp;&nbsp;|&nbsp;&nbsp;
        {/* reporting question */}
        <a className='questions-and-answers' onClick={() => reportQues(props.ques.question_id)}>Report</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
        {/* adding an answer to question */}
        <a className='questions-and-answers' onClick={() => {
          props.setModalAnswOn(!props.modalAnswOn);
          props.setQID(props.ques);
          }}>Add Answer</a>
        </span>
      </span>
    </div>
      <br></br>

    {/* set each answer ----------------- */}
    {currentAnswers.length === 0 ? 'No answers yet!' : currentAnswers.map((ans, index) => (
      <AWEntry ans={ans} key={index} index={index} setImage={props.setImage} setModalOn={props.setModalOn} modalOn={props.modalOn} />
    ))}


    {/* display 'load more answers' button depending on condition --------------- */}
    <div className="load-more-a">
      {(answers.length === currentAnswers.length) ? "" : (answers.length > 2) ? <a onClick={() => addAnsw()}>LOAD MORE ANSWERS</a> : ""}
    </div>

    <hr className={`hr3 ${darkMode ? 'hr3-dark' : null}`} style={props.lastIndex === props.index ? {border: 'none'} : {}}></hr>

    <br></br>
  </>
  )
}

export default QAEntry;