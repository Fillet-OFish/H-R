import React from 'react';
import axios from 'axios';
import QA from './QA.jsx';

const QuesnAnsw = (props) => {


  return (
    <div>
      <div>
        <QA qaData={props.qaData} currentRecords={props.currentRecords} nPages={props.nPages} currentPage={props.currentPage} setCurrentPage={props.setCurrentPage} />
      </div>
    </div>
  )
}

export default QuesnAnsw;