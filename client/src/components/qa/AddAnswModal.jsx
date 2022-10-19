import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


// ENTRY OF EACH ANSWER ----------
const AddAnswModal = (props) => {
  // set state to keep track of rendering button to add more pics in add answer
  const [files, setFiles] = useState(0);

  // post request to add answer
  const postAnsw = (q_id, body, name, email, photos) => {
    axios.post(`/api/qa/questions/${q_id}/answers`, {
      body: body,
      name: name,
      email: email,
      photos: photos
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
          let pics = [...e.target.photos.files].map((cur, index) => cur.name);
          postAnsw(props.QID.question_id, e.target.reply.value, e.target.user.value, e.target.email.value, pics);
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

          <label><b>Photos</b></label>
          <br></br>
          {(files <= 5) ?  <input type='file' name='photos' accept=".jpg, .jpeg, .png" onChange={(e) => setFiles(e.target.files.length)} multiple /> : `Max image uploads are 5. Your uploads: ${files}`}

          <button type='submit' className='form-button'>Submit</button>
        </form>
      </div> :
        ""}
    </div>
  )
}

export default AddAnswModal;