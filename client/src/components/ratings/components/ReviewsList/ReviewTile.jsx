import React from 'react';
import { format } from 'date-fns';
import ReviewImgs from './ReviewImgs.jsx';
import StarRatings from '../../../../helper/StarRatings.jsx';
import axios from 'axios';
import { useDarkMode } from '../../../../contexts/DarkMode.jsx'

export default function ReviewsList(props) {
  const darkMode = useDarkMode();

  // make an axios put request to mark questions as helpful
  const helpfulRev = (r_id) => {
    axios.put(`/api/reviews/${r_id}/helpful`)
    .catch(err => {
      console.log(err);
    })
  }
  // make an axios put request to report questions
  const reportRev = (r_id) => {
    axios.put(`/api/reviews/${r_id}/report`)
    .catch(err => {
      console.log(err);
    })
  }

  return(
    <div className='display-reviews'>
      {/* render ratings, user info, and date */}
      <div>
        <span className={`reviewer ${darkMode ? 'reviewer-dark' : null}`}>
          {props.review.reviewer_name}</span>
        <span className={`reviewer-time`}>{format(new Date(props.review.date), 'MM/dd/yyyy')}</span>
        <div><StarRatings itemRating={props.review.rating} /></div>
      </div>

      {/* render review title and body */}
      <div style={{marginBottom: '3%'}}><strong>{props.review.summary}</strong></div>
      <div style={{marginBottom: '3%'}}>{props.review.body}</div>

      {/* render images of reviews ----------------- */}
      <div>
        {props.review.photos.map((photo, index) => (
          <ReviewImgs photo={photo} key={index} setImage={props.setImage} modalOn={props.modalOn} setModalOn={props.setModalOn} />
        ))}
      </div>

      {/* rendering recommended */}
      <div>
        {(props.review.recommend === true) ? ':) I recommend this product' : ''}
      </div>

      <br></br>

      {/* rendering response by seller */}
      <div>
        {(props.review.response !== null) ? props.review.response : ''}
      </div>

      <br></br>

      {/* rendering helpful/report */}
      <div>
        <label className={`reviewer-helpful`} >Helpful?&nbsp;
          <a onClick={() => helpfulRev(props.review.review_id)}>Yes</a> ({props.review.helpfulness})
          &nbsp;&nbsp;|&nbsp;&nbsp;
          {/* reporting question */}
          <a onClick={() => reportRev(props.review.review_id)}>Report</a>
        </label>
      </div>

      <hr className={`hr3 ${darkMode ? 'hr3-dark' : null}`} style={props.lastIndex === props.index ? {border: 'none'} : {}}></hr>

    </div>
  )
}