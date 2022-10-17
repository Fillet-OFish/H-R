import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';



export default function StarRatings({item, name}) {

  const [rating, setRating] = useState(null);

  console.log(name, rating)

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
          const starFill = () => {
            if (rating.average - i >= 1) {
              return 100
            }
            if (rating.average - i >= 0.75) {
              return 75
            }
            if (rating.average - i >= 0.50) {
              return 50
            }
            if (rating.average - i >= 0.25) {
              return 25
            }
            return 0
          }
          const style = {
            display: 'inline-block',
            background: `linear-gradient(90deg, #f80 ${starFill()}%, #ddd 0 ${100 - starFill()}%`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }
          return (
            // <FaStar key={i} style={{backgroundColor: `linear-gradient(90deg, #f80 ${starFill()}%, #ddd ${100 - starFill()}%`}} />
            // <FaStar key={i} color={starFill() ? '#f80' : '#ddd'} />
            <small key={i} style={style}>⭐</small>
            )
        }) : null}
    </div>
  )
}
