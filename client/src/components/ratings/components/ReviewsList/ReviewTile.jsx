import React, { useState, useEffect } from 'react';
import {format} from 'date-fns';
import ReviewImgs from './ReviewImgs.jsx';
import StarRatings from '../../../StarRatings.jsx';
import axios from 'axios';
import { useDarkMode } from '../../../DarkMode.jsx'

export default function ReviewsList(props) {
  const darkMode = useDarkMode();

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
      <div>
        <span className={`reviewer ${darkMode ? 'reviewer-dark' : null}`}>
          {props.review.reviewer_name}</span>
        <span className={`reviewer-time`}>{format(new Date(props.review.date), 'MM/dd/yyyy')}</span>
        <StarRatings itemRating={props.review.rating} />
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

      {/* rendering reccomended */}
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

      {/* set each answer ----------------- */}
      {/* <div className='AContainer'>
        {currentAnswers.length === 0 ? 'No answers yet!' : currentAnswers.map((ans, index) => (
          <AWEntry ans={ans} key={index} index={index} setImage={props.setImage} setModalOn={props.setModalOn} modalOn={props.modalOn} />
          // <div><strong>A: {`A: ${ans.body}`}</strong></div>
          ))}
        </div> */}

      <hr className={`hr3 ${darkMode ? 'hr3-dark' : null}`} style={props.lastIndex === props.index ? {border: 'none'} : {}}></hr>

    </div>
  )
}