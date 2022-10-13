import React from 'react';


const QA = (props) => {

  return (
    <div>
      <h1>Questions & Answers</h1>
      <h3><string>Q: </string></h3>
      {props.questions.map((ques, index) => {
        <QAEntry ques={ques} key={index} />
      })}
    </div>
  )
}