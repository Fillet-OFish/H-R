import React from 'react';
import {formatDistanceToNow, parseISO} from 'date-fns';

// ENTRY OF EACH ANSWER ----------
const AWEntry = (props) => {

  return (
    <div>
      <div><strong>A:</strong>{props.ans.body}</div>
      <br></br>
      {props.ans.photos.map((img, index) => (
        <img src={img.url} key={index} ></img>
      ))}
      <div className='user_info'>by {props.ans.answerer_name}, {formatDistanceToNow(parseISO(props.ans.date))} | Helpful? <a>Yes</a> ({props.ans.helpfulness}) | <a>Report</a> </div>
      <br></br>
    </div>
  )
}

export default AWEntry;