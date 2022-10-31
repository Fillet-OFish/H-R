import React from 'react';
import {format} from 'date-fns';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useDarkMode } from '../../../contexts/DarkMode.jsx'


// ENTRY OF EACH ANSWER ----------
const AWEntry = (props) => {
  const darkMode = useDarkMode();

  // make an axios put request to mark answers as helpful
  const helpfulAnsw = (a_id) => {
    axios.put(`/api/qa/answers/${a_id}/helpful`)
    .catch(err => {
      console.log(err);
    })
  }

  // make an axios put request to report answers
  const reportAnsw = (a_id) => {
    axios.put(`/api/qa/answers/${a_id}/report`)
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <>
      <div className="QAContainer">
      {/* answer body - if index is 0 add the 'A' as the starting question ---------- */}
      {/* otherwise, just show questions without 'A' title */}
        <span className='QA-left'>
          A:
        </span>

        <span className='A-right'>
          {props.ans.body}
        </span>
      </div>

      {/* answer images --- */}

      <div className="a-photos">
        {props.ans.photos.map((img, index) => (
          <img src={img.url} key={index} onClick={() => {
            props.setModalOn(!props.modalOn);
            props.setImage(img.url);
          }} className='answ-images'></img>
        ))}
      </div>

      {/* answer user info --- */}
      <div className={`user_info ${darkMode ? 'user_info-dark' : null}`}>by {props.ans.answerer_name}, {format(new Date(props.ans.date), 'MMMM dd, yyyy')}
      &nbsp;&nbsp;|&nbsp;&nbsp;
      {/* answer helpfulness */}
      Helpful?
      &nbsp;
      <a className='questions-and-answers' onClick={() => helpfulAnsw(props.ans.answer_id)}>Yes</a> ({props.ans.helpfulness})
      &nbsp;&nbsp;|&nbsp;&nbsp;
      {/* reporting an answer */}
      <a className='questions-and-answers' onClick={() => reportAnsw(props.ans.answer_id)}>Report</a>
      </div>
      <br/>
    </>
  )
}

export default AWEntry;