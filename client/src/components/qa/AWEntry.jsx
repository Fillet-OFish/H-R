import React from 'react';

// ENTRY OF EACH ANSWER ----------
const AWEntry = (props) => {

  return (
    <div>
      <div><strong>A:</strong>{props.ans.body}</div>
    </div>
  )
}

export default AWEntry;