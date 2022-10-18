import React from 'react';
import {formatDistanceToNow, parseISO, setDate} from 'date-fns';
import {useState, useEffect} from 'react';


// ENTRY OF EACH ANSWER ----------
const AWEntry = (props) => {
  // state to keep track if an answers has been helpful
  const [helpful, setHelpful] = useState(false);


  return (
    <div>
      {/* answer body - if index is 0 add the 'A' as the starting question ---------- */}
      {/* otherwise, just show questions without 'A' title */}
      {(props.index === 0) ? <div><strong>A: </strong>{props.ans.body}</div> : <div>{props.ans.body}</div>}
      <br></br>
      {/* answer images --- */}
      {props.ans.photos.map((img, index) => (
        <img src={img.url} key={index} onClick={() => {
          props.setModalOn(!props.modalOn);
          props.setImage(img.url);
        }} className='answ-images'></img>
      ))}
      {/* answer user info --- */}
      <div className='user_info'>by {props.ans.answerer_name}, {formatDistanceToNow(parseISO(props.ans.date))} | Helpful? <a className='questions-and-answers' onClick={() => {
        (helpful) ? props.ans.helpfulness-- : props.ans.helpfulness++;
        setHelpful(!helpful);
      }}>Yes</a> ({props.ans.helpfulness}) | <a className='questions-and-answers' >Report</a> </div>
      <br></br>
    </div>
  )
}

export default AWEntry;