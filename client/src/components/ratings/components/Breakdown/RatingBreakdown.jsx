import React, { useState, useEffect } from 'react';
import StarRatings from '../../../StarRatings.jsx';
import BreakdownByStars from './BreakdownByStars.jsx';

export default function RatingBreakdown({ rating, product, numReviews, reviews, filter, setFilter }) {
  const ratingRoundedToTenth = Math.round(rating * 10) / 10;

  return(
    <>
      <div className='rating-summary'>
        <span style={{display: 'inline-block'}}>
          {ratingRoundedToTenth}
        </span>
        <span style={{display: 'inline-block'}}><StarRatings item={product.id} /></span><br/>
        {`${numReviews} reviews`}
      </div>
      <div>
        <BreakdownByStars reviews={reviews} filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}