import React from 'react';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {useState, useEffect} from 'react';
var toDate = require('date-fns/toDate')

// ENTRY OF EACH ANSWER ----------
const AWEntry = (props) => {
  // state to keep track if an answers has been helpful
  const [helpful, setHelpful] = useState(false);

  console.log(props.ans.date, '------------------');
  console.log(props.ans.helpfulness, '------------------');

  // const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
  // console.log(result, '-------')

  return (
    <div>
      {/* answer body - if index is 0 add the 'A' as the starting question ---------- */}
      {/* otherwise, just show questions without 'A' title */}
      {(props.index === 0) ? <div><strong>A:</strong>{props.ans.body}</div> : <div>{props.ans.body}</div>}
      <br></br>
      {/* answer images --- */}
      {props.ans.photos.map((img, index) => (
        <img src={img.url} key={index} ></img>
      ))}
      {/* answer user info --- */}
      <div className='user_info'>by {props.ans.answerer_name}, {formatDistanceToNow(parseISO(props.ans.date))} | Helpful? <a onClick={() => {
        (helpful) ? props.ans.helpfulness-- : props.ans.helpfulness++;
        setHelpful(!helpful);
      }}>Yes</a> ({props.ans.helpfulness}) | <a>Report</a> </div>
      <br></br>
    </div>
  )
}

export default AWEntry;