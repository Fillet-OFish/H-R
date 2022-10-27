import React, { useState, useEffect } from 'react';
import {format} from 'date-fns';
import ReviewImgs from './ReviewImgs.jsx';
import StarRatings from '../../../StarRatings.jsx';
import axios from 'axios';

export default function ReviewsList(props) {

  console.log(props.review)

  // make an axios put request to mark questions as helpful
  const helpfulRev = (r_id) => {
    console.log('ENTER HELPFUL ---')
    axios.put(`/api/reviews/${r_id}/helpful`)
    .then((response) => {
      console.log('Successful put for helpfulRev!')
    })
    .catch(err => {
      console.log(err);
    })
  }
  // make an axios put request to report questions
  const reportRev = (r_id) => {
    console.log('ENTER REPORT ---')
    axios.put(`/api/reviews/${r_id}/report`)
    .then((response) => {
      console.log('Successful put for reportRev!')
    })
    .catch(err => {
      console.log(err);
    })
  }


  return(
    <div className='display-reviews'>
      {/* render ratings, user info, and date */}
      <div><StarRatings itemRating={props.review.rating} />
        <label style={{float: 'right', marginRight: '3%'}} className='user_info'>by {props.review.reviewer_name}, {format(new Date(props.review.date), 'MMMM dd, yyyy')}</label>
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
        <label className='user_info' >Helpful? <a className='questions-and-answers' onClick={() => helpfulRev(props.review.review_id)}>Yes</a> ({props.review.helpfulness}) |
          {/* reporting question */}
          <a className='questions-and-answers' onClick={() => reportRev(props.review.review_id)}>Report</a>
        </label>
      </div>

      <hr className='hr3'></hr>

    </div>
  )
}