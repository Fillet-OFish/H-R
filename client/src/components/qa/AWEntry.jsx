import React from 'react';
import {formatDistanceToNow, parseISO, setDate} from 'date-fns';
import {useState, useEffect} from 'react';
import axios from 'axios';


// ENTRY OF EACH ANSWER ----------
const AWEntry = (props) => {

  // make an axios put request to mark answers as helpful
  const helpfulAnsw = (a_id) => {
    axios.put(`/api/qa/answers/${a_id}/helpful`)
    .then((response) => {
      console.log('Successful put for helpfulAnsw!')
    })
    .catch(err => {
      console.log(err);
    })
  }

  // make an axios put request to report answers
  const reportAnsw = (a_id) => {
    axios.put(`/api/qa/answers/${a_id}/report`)
    .then((response) => {
      console.log('Successful put for reportAnsw!')
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <div>
      {/* answer body - if index is 0 add the 'A' as the starting question ---------- */}
      {/* otherwise, just show questions without 'A' title */}
      {(props.index === 0) ? <div><strong>A: </strong>{props.ans.body}</div> : <div>{props.ans.body}</div>}
      {/* <div><strong>A: </strong>{props.ans.body}</div> */}
      <br></br>

      {/* answer images --- */}
      {props.ans.photos.map((img, index) => (
        <img src={img.url} key={index} onClick={() => {
          props.setModalOn(!props.modalOn);
          props.setImage(img.url);
        }} className='answ-images'></img>
      ))}

      {/* answer user info --- */}
      <div className='user_info'>by {props.ans.answerer_name}, {formatDistanceToNow(parseISO(props.ans.date))} |
      {/* answer helpfulness */}
      Helpful? <a className='questions-and-answers' onClick={() => helpfulAnsw(props.ans.answer_id)}>Yes</a> ({props.ans.helpfulness}) |
      {/* reporting an answer */}
      <a className='questions-and-answers' onClick={() => reportAnsw(props.ans.answer_id)}>Report</a>
      </div>

      <br></br>
    </div>
  )
}

export default AWEntry;