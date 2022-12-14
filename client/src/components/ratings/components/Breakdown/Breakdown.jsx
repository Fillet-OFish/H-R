import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

export default function Breakdown({ rating, product, numReviews, reviews, reviewsMeta, filter, setFilter }) {

  return(
    <>
      <RatingBreakdown rating={rating} product={product} numReviews={numReviews} reviews={reviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter}/>
      <ProductBreakdown rating={rating} product={product} numReviews={numReviews} reviews={reviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter}/>
    </>
  )
}