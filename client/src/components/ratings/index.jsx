import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breakdown from './components/Breakdown/Breakdown.jsx'

export default function Reviews({ product, rating, setRating, numReviews, setNumReviews }) {
  const [reviews, setReviews] = useState(null)
  const [reviewsMeta, setReviewsMeta] = useState(null)
  const [filter, setFilter] = useState([])

  console.log('reviews: ', reviews)
  console.log('reviewsMeta: ', reviewsMeta)
  console.log('rating: ', rating)
  console.log('numReviews: ', numReviews)

  useEffect(() => {
    axios.get(`/api/reviews/${product.id}`)
      .then(result => {
        setReviews(result.data.results)
        // Average rating: sum rating, divide by results length -> setRating to computed rating
        // setNumReviews(result.data.results.length)
        // let rating = result.data.results.reduce(function(prev, review){
        //   return prev + review.rating
        // },0)/result.data.results.length
        // setRating(rating)
      })
      .catch(err=>console.log(err));
    axios.get(`/api/reviews/meta/${product.id}`)
      .then(result => {
        let data = result.data;
        let totalNum = Number(data.recommended.true) + Number(data.recommended.false);
        let rating = (Number(data.ratings[1]) + (Number(data.ratings[2]) * 2) + (Number(data.ratings[3]) * 3)+ (Number(data.ratings[4]) * 4) + (Number(data.ratings[5]) * 5)) / totalNum
        let roundedRating = Math.round(rating * 10) / 10
        setReviewsMeta(data);
        setNumReviews(totalNum);
        setRating(roundedRating);
      })
      .catch(err => {console.log(err)})
  },[product])

  return(
    reviews && reviewsMeta ?
    <div>
        <h3>Ratings & Reviews</h3>
        <Breakdown product={product} rating={rating} numReviews={numReviews} reviews={reviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter}/>
    </div>
    : null
  )
}