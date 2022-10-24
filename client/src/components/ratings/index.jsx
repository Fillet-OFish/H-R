import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breakdown from './components/Breakdown/Breakdown.jsx'

export default function Reviews({ product, rating, setRating, numReviews, setNumReviews }) {
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState([])

  console.log('filter: ', filter)



  useEffect(() => {
    axios.get(`/api/reviews/${product.id}`)
      .then(result => {
        setReviews(result.data.results)
        // Average rating: sum rating, divide by results length -> setRating to computed rating
        // setNumReviews(result.data.results.length)
        let rating = result.data.results.reduce(function(prev, review){
          return prev + review.rating
        },0)/result.data.results.length
        setRating(rating)
      })
  },[product])

  return(
    <div>
        <h3>Ratings & Reviews</h3>
        <Breakdown product={product} rating={rating} numReviews={numReviews} reviews={reviews} filter={filter} setFilter={setFilter}/>
    </div>
  )
}