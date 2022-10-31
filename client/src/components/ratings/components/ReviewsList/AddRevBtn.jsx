import React from 'react';

const AddRevBtn = (props) => (
  <div>
    <button className='form-button2' onClick={() => props.setModalRevOn(!props.modalRevOn)}>Add Review +</button>
  </div>
)

export default AddRevBtn;