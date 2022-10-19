import React from 'react';


const AddQuesBtn = (props) => (
  <div>
    <button onClick={() => props.setModalQuesOn(!props.modalQuesOn)}>Add Question</button>
  </div>
)

export default AddQuesBtn;