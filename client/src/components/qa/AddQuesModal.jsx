import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


// ENTRY OF EACH ANSWER ----------
const AddQuesModal = (props) => {
  // set state to keep track of rendering button to add more pics in add answer
  const [files, setFiles] = useState(0);

  // post request to add answer
  const postQues = (body, name, email, product_id) => {
    axios.post(`/api/qa/questions`, {
      body: body,
      name: name,
      email: email,
      product_id: product_id
    })
    .then((response) => {
      console.log(response, 'ADD QUES POST ----')
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className={(props.modalQuesOn === true) ? 'popup-ques' : ''}>
      {props.modalQuesOn === true ?
        <div className='form-popup'>
        <form onSubmit={(e) => {
          e.preventDefault();
          postQues(e.target.ques.value, e.target.user.value, e.target.email.value, props.product.id);
          props.setModalQuesOn(!props.modalQuesOn);
          e.target.ques.value = '';
          e.target.user.value = '';
          e.target.email.value = '';
          }} className='form-container'>
          <h1>Ask Your Question</h1>
          <h2 className='subheading'>{`About the ${props.product.name}`}</h2>

          <label><b>Your Question</b></label>
          <br></br>
          <textarea type='text' name='ques' placeholder='Enter question...' maxLength="1000" required></textarea>
          <br></br>

          <label><b>What is your nickname</b></label>
          <input type='text' name='user' placeholder='Example: jackson11!' maxLength="60" required></input>
          <div className='warnings'>For privacy reasons, do not use your full name or email address</div>

          <label><b>Your email</b></label>
          <input type='text' name='email' placeholder='Example: jack@email.com' required></input>
          <div className='warnings'>For authentication reasons, you will not be emailed</div>

          <button type='submit' className='form-button'>Submit</button>
        </form>
      </div> :
        ""}
    </div>
  )
}

export default AddQuesModal;