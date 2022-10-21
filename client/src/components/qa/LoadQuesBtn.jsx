import React from 'react';


const LoadQuesBtn = (props) => (
  <div>
    <button className='form-button3' onClick={() => props.loadQues()}>Load More Questions</button>
  </div>
)

export default LoadQuesBtn;