import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios';


export default function ReviewsList({product, reviews, setReviews, reviewsPage, setReviewsPage}) {

  const loadMoreReviews=() => {
    axios.get(`/api/reviews/${product.id}/${reviewsPage + 1}/2`)
    .then(result => {
      setReviews(reviews.concat(result.data.results))
    })
    .catch(err=>console.log(err));
  }

  return(
    <div className='reviews-list'>
      {reviews.map((review) => (
        <ReviewTile key={review.review_id} review={review} />
        ))}
        <button onClick={loadMoreReviews}>Load More Reviews</button>
    </div>
  )
}