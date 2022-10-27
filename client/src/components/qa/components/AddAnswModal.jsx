import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';


const AddAnswModal = (props) => {
  // array of images uploaded using cloudinary
  const [uploadImgs, setUploadImgs] = useState([]);
  let tempImgs = [];

  // CLOUDINARY ------------------------------------------------------------------------
  const cloudName = 'dkbpaia1x'; // replace with your own cloud name
  const uploadPreset = 'cloudinary-upload'; // replace with your own upload preset

  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      maxFiles: 5,
      // cropping: true, //add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      sources: [ "local", "url", "camera", "google_drive", "instagram", "facebook", "gettyimages", "unsplash"], // restrict the upload sources to URL and local files
      // multiple: false,  //restrict upload to a single file
      // folder: "user_images", //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        tempImgs.push(result.info);
        setUploadImgs([...tempImgs]);
      }
    }
  );
  // CLOUDINARY ------------------------------------------------------------------------


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
  // need this useEffect to re-render when uploadImgs gets new data
  // this fixes array not updating in useState
  useEffect(() => {
    console.log("uploadImgs: ", uploadImgs);
  }, [uploadImgs])


  // if modal is true render the answer submission form
  return (
    <div className={(props.modalAnswOn === true) ? 'popup-answ' : ''}>
      {props.modalAnswOn === true ?
        <div className='form-popup'>
          <form onSubmit={(e) => {
            e.preventDefault();
            let pics = uploadImgs.map((cur, index) => cur.thumbnail_url);
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

            {/* button for cloudinary uploads --- */}
            <button
              id="upload_widget"
              className="cloudinary-button" onClick={() => myWidget.open()}>
                Upload files
            </button>
            <br></br>

            {/* if length of uploaded images is greater than 5 display message */}
            {(uploadImgs.length < 5) ?
              ""
            :
              'Max image uploads are 5.'
            }
            <br></br>

            {/* show a thumbnail of each uploaded image */}
            {(uploadImgs.length === 0) ? "" : uploadImgs.map((current, index) => (
              <img
                id="uploadedimage"
                src={current.thumbnail_url}
                style={{marginRight: '1%', marginTop: '2%'}}
                key={index}
              ></img>
            ))}
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