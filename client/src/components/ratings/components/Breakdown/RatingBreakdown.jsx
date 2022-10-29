import React, { useState, useEffect } from 'react';
import StarRatings from '../../../helper/StarRatings.jsx';
import BreakdownByStars from './BreakdownByStars.jsx';

export default function RatingBreakdown({ rating, product, numReviews, reviews, reviewsMeta, filter, setFilter }) {
  return(
    <>
      <div className='rating-summary'>
        <span className='rating' style={{display: 'inline-block'}}>
          {rating}
        </span>
        <span className='star' style={{display: 'inline-block'}}><StarRatings itemRating={rating} /></span><br/>
      </div>
      <div>
        <BreakdownByStars reviews={reviews} numReviews={numReviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}