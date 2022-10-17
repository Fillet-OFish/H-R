import React from 'react';
import QAEntry from './QAEntry.jsx';
import Pagination from './Pagination.jsx';


const QA = (props) => {


  // iterate through questions data
  return (
    <div className='QContainer'>
      <h2>Questions & Answers</h2>
      {props.currentRecords.map((ques, index) => (
        // set each question entry ---------
        <QAEntry ques={ques} key={index} qaData={props.qaData} />
      ))}

      {/* set pagination ----------- */}
      <Pagination nPages={props.nPages} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} />
    </div>
  )
}

export default QA;