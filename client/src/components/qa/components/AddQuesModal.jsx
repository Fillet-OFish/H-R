import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


const AddQuesModal = (props) => {

  // post request to add answer
  const postQues = (body, name, email, product_id) => {
    console.log(body,name,email,product_id, 'POSTQUES ---')
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

  // if modal is true render the question submission form
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

            {/* close button for form */}
            <span className='form-close-btn' onClick={() => props.setModalQuesOn(!props.modalQuesOn)}>X</span>

            {/* form title */}
            <h1>Ask Your Question</h1>
            <h2 className='subheading' style={{marginBottom: '5%'}} >{`About the ${props.product.name}`}</h2>

            {/* question */}
            <label><b>Question</b></label>
            <br></br>
            <textarea type='text' name='ques' placeholder='Enter question...' maxLength="1000" required></textarea>
            <br></br>

            {/* nickname and email labels --------- */}
            <label><b>Nickname</b></label>
            <label style={{marginLeft: '40%'}}><b>Email</b></label>
            {/* aligning nickname and email inputs --------- */}
            <div className='align-input'>
              {/* nickname */}
              <input type='text' name='user' placeholder='jackson11!' maxLength="60" required></input>
              {/* email */}
              <input type='text' name='email' placeholder='jack@email.com' required></input>
            </div>

            {/* aligning warnings for inputs ---------- */}
            <div className='align-input'>
              <div className='warnings'>For privacy reasons, do not use your full name or email address</div>
              <div className='warnings' style={{marginLeft: '11%', marginBottom: '2%'}}>For authentication reasons, you will not be emailed</div>
            </div>
            <br></br>

            {/* submit button */}
            <button type='submit' className='form-button' style={{marginBottom: '3%'}}>Submit</button>
          </form>
        </div> :
        ""}
    </div>
  )
}

export default AddQuesModal;