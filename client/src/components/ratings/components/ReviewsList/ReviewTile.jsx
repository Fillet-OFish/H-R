import React, { useState, useEffect } from 'react';

export default function ReviewsList({review}) {

  console.log(review)

  return(
    <div style={{border: 'solid 1px'}}>
      <small>review id: {review.review_id}</small>
      <small>rating: {review.rating}</small>
      <small>body: {review.body}</small>
      <small>summary: {review.summart}</small>
      <small>recommend: {JSON.stringify(review.recommend)}</small>
      <small>date: {review.date}</small>
    </div>
  )
}