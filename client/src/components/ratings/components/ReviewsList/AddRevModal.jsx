import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useDarkMode } from '../../../contexts/DarkMode.jsx';

const AddRevModal = (props) => {
  const darkMode = useDarkMode();

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
      sources: [ "local", "url", "camera", "google_drive", "instagram", "facebook", "gettyimages", "unsplash"], // restrict the upload sources to URL and local files
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        tempImgs.push(result.info);
        setUploadImgs([...tempImgs]);
      }
    }
  );
  // CLOUDINARY ------------------------------------------------------------------------


  // post request to add review
  const postRev = (product_id, rating, summary, body, recommend, name, email, photos, characteristics) => {
    axios.post(`/api/reviews`, {
      product_id: product_id,
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email,
      photos: photos,
      characteristics: characteristics
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // need this useEffect to re-render when uploadImgs gets new data
  // this fixes array not updating in useState
  useEffect(() => {
  }, [uploadImgs])


  // if modal is true render the question submission form
  return (
    <div className={(props.modalRevOn === true) ? 'popup-ques' : ''}>
      {props.modalRevOn === true ?
        <div className='form-popup'>
          <form onSubmit={(e) => {
            e.preventDefault();
            let pics = uploadImgs.map((cur, index) => cur.thumbnail_url);
            let char = {};
            let meta = [
              props.reviewsMeta.characteristics.Size,
              props.reviewsMeta.characteristics.Width,
              props.reviewsMeta.characteristics.Comfort,
              props.reviewsMeta.characteristics.Quality,
              props.reviewsMeta.characteristics.Length,
              props.reviewsMeta.characteristics.Fit
            ];
            let targets = [
              e.target.size.value,
              e.target.width.value,
              e.target.comfort.value,
              e.target.quality.value,
              e.target.length.value,
              e.target.fit.value
            ];
            meta.forEach((curr, index) => {
              if (curr) {
                char[curr.id] = Number(targets[index]);
              }
            })
            postRev(props.product.id, Number(e.target.rating.value), e.target.summary.value, e.target.body.value, (e.target.recom.value === 'true' ? true : false), e.target.user.value, e.target.email.value, pics, char);
            props.setModalRevOn(!props.modalRevOn);
            e.target.summary.value = '';
            e.target.body.value = '';
            e.target.user.value = '';
            e.target.email.value = '';
            }} className={`form-container ${darkMode ? 'form-container-dark' : '' }`}>

            {/* close button for form */}
            <span className='form-close-btn' onClick={() => props.setModalRevOn(!props.modalRevOn)}>X</span>

            {/* form title */}
            <h1>Write Your Review</h1>
            <h2 className='subheading' style={{marginBottom: '5%'}} >{`About the ${props.product.name}`}</h2>

            {/* rating */}
            <label>* Rating: </label>
            <select name='rating' defaultValue={'DEFAULT'}>
              <option value="DEFAULT" disabled>none selected</option>
              <option value={1}>Poor</option>
              <option value={2}>Fair</option>
              <option value={3}>Average</option>
              <option value={4}>Good</option>
              <option value={5}>Great</option>
            </select>

            <br></br>
            <br></br>

            {/* review - summary and body */}
            <label><b>* Review</b></label>
            <br></br>
            <label>Title</label>
            <br></br>
            <input type='text' name='summary' placeholder='Best purchase ever!' maxLength="60" required></input>
            <br></br>
            <label>Body</label>
            <br></br>
            <textarea type='text' name='body' placeholder='Why did you like the product or not?' minLength='50' maxLength="1000" required></textarea>
            <br></br>

            {/* recommend */}
            <label>* Recommend: </label>
            <select name='recom' defaultValue={'DEFAULT'} >
              <option value="DEFAULT" disabled>none selected</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>

            <br></br>
            <br></br>

            {/* nickname and email labels --------- */}
            <label><b>* Nickname</b></label>
            <label style={{marginLeft: '37%'}}><b>* Email</b></label>
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

            {/* characteristics ----- */}
            <label><b>* Size</b></label>
            <label style={{marginLeft: '40%'}}><b>* Width</b></label>
            <div className='align-input'>
              <select name='size' defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>none selected</option>
                <option value={1}>A size too small</option>
                <option value={2}>½ a size too small</option>
                <option value={3}>Perfect</option>
                <option value={4}>½ a size too big</option>
                <option value={5}>A size too wide</option>
              </select>

              <select name='width' defaultValue={'DEFAULT'} style={{marginLeft: '27%'}}>
                <option value="DEFAULT" disabled>none selected</option>
                <option value={1}>Too narrow</option>
                <option value={2}>Slightly narrow</option>
                <option value={3}>Perfect</option>
                <option value={4}>Slightly wide</option>
                <option value={5}>Too wide</option>
              </select>
            </div>

            <label><b>* Comfort</b></label>
            <label style={{marginLeft: '35%'}}><b>* Quality</b></label>
            <div>
              <select name='comfort' defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>none selected</option>
                <option value={1}>Uncomfortable</option>
                <option value={2}>Slightly uncomfortable</option>
                <option value={3}>Ok</option>
                <option value={4}>Comfortable</option>
                <option value={5}>Perfect</option>
              </select>

              <select name='quality' defaultValue={'DEFAULT'} style={{marginLeft: '23.5%'}}>
                <option value="DEFAULT" disabled>none selected</option>
                <option value={1}>Poor</option>
                <option value={2}>Below average</option>
                <option value={3}>What I expected</option>
                <option value={4}>Pretty great</option>
                <option value={5}>Perfect</option>
              </select>
            </div>

            <label><b>* Length</b></label>
            <label style={{marginLeft: '36.5%'}}><b>* Fit</b></label>
            <div>
              <select name='length' defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>none selected</option>
                <option value={1}>Runs Short</option>
                <option value={2}>Runs slightly short</option>
                <option value={3}>Perfect</option>
                <option value={4}>Runs slightly long</option>
                <option value={5}>Runs long</option>
              </select>

              <select name='fit' defaultValue={'DEFAULT'} style={{marginLeft: '26.8%'}}>
                <option value="DEFAULT" disabled>none selected</option>
                <option value={1}>Runs tight</option>
                <option value={2}>Runs slightly tight</option>
                <option value={3}>Perfect</option>
                <option value={4}>Runs slightly long</option>
                <option value={5}>Runs long</option>
              </select>
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

            {/* submit button */}
            <button type='submit' className='form-button' style={{marginBottom: '3%'}}>Submit</button>
          </form>
        </div> :
        ""}
    </div>
  )
}

export default AddRevModal;