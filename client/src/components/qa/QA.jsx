import React from 'react';
import QAEntry from './QAEntry.jsx';


const QA = (props) => {

  return (
    <div>
      <h2>Questions & Answers</h2>
      {props.qaData.map((ques, index) => (
        <QAEntry ques={ques} key={index} qaData={props.qaData} />
      ))}
    </div>
  )
}

export default QA;