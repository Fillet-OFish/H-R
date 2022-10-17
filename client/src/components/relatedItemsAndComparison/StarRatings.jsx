import { FaStar } from "react-icons/fa";
import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';


export default function StarRatings({item}) {

  const [rating, setRating] = useState(null);

  console.log('rating: ', rating)

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get(`/api/reviews/${item}`, {cancelToken: source.token})
    .then((data) => {
      let rating = {};
      rating.count = data.data.count;
      let average = 0
      for (var i = 0; i < data.data.results.length; i++) {
        average += data.data.results[i].rating
        if (i === data.data.results.length - 1) {
          average = average / data.data.results.length
        }
      }
      rating.average = average;
      setRating(rating);
    })
    .catch(err => {console.log(err)})
  }, [])


  return (
    <div>
      {rating ?
        [...Array(5)].map((star, i) => {
          const starIndex = i + 1
          const starFill = () => {
            if (rating.average - starIndex >= 1) {
              return 100
            }
            if (rating.average - starIndex >= 0.75) {
              return 75
            }
            if (rating.average - starIndex >= 0.50) {
              return 50
            }
            if (rating.average - starIndex >= 0.25) {
              return 25
            }
            return 0
          }
          console.log('starFill: ', starFill())
          return (
            // <FaStar key={i} color={`linear-gradient(90deg, #f80 ${starFill()}%, #ddd ${100 - starFill()}%`} />
            <FaStar key={i} color={starFill() ? '#f80' : '#ddd'} />

          )
        }) : null}
    </div>
  )
}
