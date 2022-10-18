import React from 'react';
import axios from 'axios';
import QA from './QA.jsx';


const QuesnAnsw = (props) => {

  return (
    <div className="questions-and-answers">
        <QA qaData={props.qaData} />
    </div>
  )
}

export default QuesnAnsw;