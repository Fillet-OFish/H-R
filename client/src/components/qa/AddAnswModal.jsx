import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


// ENTRY OF EACH ANSWER ----------
const AddAnswModal = (props) => {

  console.log(props.QID, 'hola')
  // post request to add answer
  const postAnsw = (q_id, body, name, email, photos) => {
    axios.post(`/api/qa/questions/${q_id}/answers`, {
      body: body,
      name: name,
      email: email,
      photos: []
    })
    .then((response) => {
      console.log(response, 'ADD ANSWER POST ----')
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className={(props.modalAnswOn === true) ? 'popup-answ' : ''}>
      {props.modalAnswOn === true ?
        <div className='form-popup'>
        <form onSubmit={(e) => {
          e.preventDefault();
          postAnsw(props.QID.question_id, e.target.reply.value, e.target.user.value, e.target.email.value);
          props.setModalAnswOn(!props.modalAnswOn);
          e.target.reply.value = '';
          e.target.user.value = '';
          e.target.email.value = '';
          }} className='form-container'>
          <h1>Submit your Answer</h1>
          <h2 className='subheading'>{`${props.product.name}: ${props.QID.question_body}`}</h2>
          <label><b>Answer</b></label>
          <br></br>
          <textarea type='text' name='reply' placeholder='Enter reply...' maxLength="1000" onChange={(e) => console.log(e.target.value)} required></textarea>
          <br></br>
          <label><b>Nickname</b></label>
          <input type='text' name='user' placeholder='Example: jack543!' maxLength="60" required></input>
          <div className='warnings'>For privacy reasons, do not use your full name or email address</div>
          <label><b>Email</b></label>
          <input type='text' name='email' placeholder='Example: jack@email.com' required></input>
          <div className='warnings'>For authentication reasons, you will not be emailed</div>

          <button type='submit' className='form-button'>Submit</button>
        </form>
      </div> :
        ""}
    </div>
  )
}

export default AddAnswModal;