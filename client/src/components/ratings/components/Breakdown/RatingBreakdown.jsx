import React from 'react';
import StarRatings from '../../../../helper/StarRatings.jsx';
import BreakdownByStars from './BreakdownByStars.jsx';

export default function RatingBreakdown({ rating, product, numReviews, reviews, reviewsMeta, filter, setFilter }) {
  return(
    <>
      <div className='rating-summary'>
        <span className='rating' style={{display: 'inline-block'}}>
          {rating}
        </span>
        <div className='star' style={{display: 'inline-block'}}><StarRatings itemRating={rating} /></div><br/>
      </div>
      <div>
        <BreakdownByStars reviews={reviews} numReviews={numReviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}