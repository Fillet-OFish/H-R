import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reviews({ product, setRating, setNumReviews }) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    axios.get(`/api/reviews/${product.id}`)
      .then(result => {
        // Average rating: sum rating, divide by results length -> setRating to computed rating
        setNumReviews(result.data.results.length)
        let rating = result.data.results.reduce(function(prev, review){
          return prev + review.rating
        },0)/result.data.results.length
        setRating(rating)
      })
  },[product])

  return(
    <>
    </>
  )
}