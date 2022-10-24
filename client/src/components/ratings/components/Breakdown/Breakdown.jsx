import React, { useState, useEffect } from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';


export default function Breakdown({ rating, product, numReviews, reviews, filter, setFilter }) {

  return(
    <>
      <RatingBreakdown rating={rating} product={product} numReviews={numReviews} reviews={reviews} filter={filter} setFilter={setFilter}/>
      <ProductBreakdown rating={rating} product={product} numReviews={numReviews} reviews={reviews} filter={filter} setFilter={setFilter}/>
    </>
  )
}