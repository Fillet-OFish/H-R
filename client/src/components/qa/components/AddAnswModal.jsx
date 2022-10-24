import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


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

  // if modal is true render the answer submission form
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

            {/* close button for form */}
            <span className='form-close-btn' onClick={() => props.setModalAnswOn(!props.modalAnswOn)}>X</span>

            {/* form title */}
            <h1>Submit your Answer</h1>
            <h2 className='subheading' style={{marginBottom: '5%'}} >{`${props.product.name}: ${props.QID.question_body}`} </h2>

            {/* answer */}
            <label><b>Answer</b></label>
            <br></br>
            <textarea type='text' name='reply' placeholder='Enter reply...' maxLength="1000" required></textarea>
            <br></br>

            {/* nickname and email labels --------- */}
            <label><b>Nickname</b></label>
            <label style={{marginLeft: '40%'}}><b>Email</b></label>
            {/* aligning nickname and email inputs --------- */}
            <div className='align-input'>
              {/* nickname */}
              <input type='text' name='user' placeholder='jack543!' maxLength="60" required></input>
              {/* email */}
              <input type='text' name='email' placeholder='jack@email.com' required></input>
            </div>

            {/* aligning warnings for inputs ---------- */}
            <div className='align-input'>
              <div className='warnings'>For privacy reasons, do not use your full name or email address</div>
              <div className='warnings' style={{marginLeft: '11%', marginBottom: '2%'}}>For authentication reasons, you will not be emailed</div>
            </div>
            <br></br>

            {/* photos ---------- */}
            <label><b>Photos</b></label>
            <br></br>
            {(files <= 5) ?  <input style={{marginTop: '1%', marginBottom: '3%'}} type='file' name='photos' accept=".jpg, .jpeg, .png" onChange={(e) => setFiles(e.target.files.length)} multiple /> : `Max image uploads are 5. Your uploads: ${files}`}
            <br></br>

            {/* submit button ---------- */}
            <button type='submit' className='form-button' style={{marginBottom: '3%'}}>Submit</button>
          </form>
        </div> :
        ""}
    </div>
  )
}

export default AddAnswModal;