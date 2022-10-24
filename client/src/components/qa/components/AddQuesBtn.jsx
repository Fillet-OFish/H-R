import React from 'react';


const AddQuesBtn = (props) => (
  <div>
    <button className='form-button2' onClick={() => props.setModalQuesOn(!props.modalQuesOn)}>Add Question +</button>
  </div>
)

export default AddQuesBtn;