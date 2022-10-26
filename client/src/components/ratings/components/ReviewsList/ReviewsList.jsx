import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios';
import LoadRevBtn from './LoadRevBtn.jsx';
import AddRevBtn from './AddRevBtn.jsx';


export default function ReviewsList(props) {

  const updateReviewPage = () => {
    props.setReviewsPage(props.reviewsPage + 1);
  }

  // load more reviews with product id, next page, and two reviews per
  const loadMoreReviews=() => {
    axios.get(`/api/reviews/${props.product.id}/${props.reviewsPage}/2`)
    .then(result => {
      props.setReviews(props.reviews.concat(result.data.results))
    })
    .catch(err=>console.log(err));
  }

  return(
    <>
      <div className='reviews-list-container'>
        {/* list every review entry --- */}
        {props.reviews.map((review, index) => (
          <ReviewTile review={review} key={index} />
          ))}
      </div>

      <div className='align-btns'>
        <div>
          {/* button to load more reviews --- */}
          <LoadRevBtn loadMoreReviews={loadMoreReviews} reviewsPage={props.reviewsPage} setReviewsPage ={props.setReviewsPage} updateReviewPage={updateReviewPage} />
        </div>
        <div>
          {/* add review button --- */}
          <AddRevBtn modalRevOn={props.modalRevOn} setModalRevOn={props.setModalRevOn} />
        </div>
      </div>
    </>
  )
}