import React, { useState, useEffect } from 'react';
import StarRatings from '../../../StarRatings.jsx';
import BreakdownByStars from './BreakdownByStars.jsx';

export default function RatingBreakdown({ rating, product, numReviews, reviews, reviewsMeta, filter, setFilter }) {
  return(
    <>
      <div className='rating-summary'>
        <span style={{display: 'inline-block'}}>
          {rating}
        </span>
        <span style={{display: 'inline-block'}}><StarRatings itemRating={rating} /></span><br/>
        {`${numReviews} reviews`}
      </div>
      <div>
        <BreakdownByStars reviews={reviews} numReviews={numReviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}