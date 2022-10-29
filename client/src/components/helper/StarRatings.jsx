import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDarkMode } from '../contexts/DarkMode.jsx'

export default function StarRatings({item, itemRating}) {
  const [rating, setRating] = useState(itemRating || null);
  const darkMode = useDarkMode();

  useEffect(() => {
    if (itemRating) {
      setRating(itemRating)
    } else {
      const source = axios.CancelToken.source();
      axios.get(`/api/reviews/meta/${item}`, {cancelToken: source.token})
      .then(result => {
        let data = result.data;
        let totalNum = Number(data.recommended.true) + Number(data.recommended.false);
        let rating = (Number(data.ratings[1]) + (Number(data.ratings[2]) * 2) + (Number(data.ratings[3]) * 3)+ (Number(data.ratings[4]) * 4) + (Number(data.ratings[5]) * 5)) / totalNum
        let roundedRating = Math.round(rating * 10) / 10
        setRating(roundedRating);
      })
      .catch(err => {console.log(err)})
    }
  }, [item, itemRating])

  return (
    <div>
      {rating ?
        [...Array(5)].map((star, i) => {
          const starFill = () => {
            if (rating - i >= 1) {
              return 100
            }
            if (rating - i >= 0.75) {
              return 70
            }
            if (rating - i >= 0.50) {
              return 50
            }
            if (rating - i >= 0.25) {
              return 30
            }
            return 0
          }
          const style = {
            display: 'inline-block',
            backgroundImage: `linear-gradient(90deg, ${darkMode ? 'yellow' : 'black'} ${starFill()}%, ${darkMode ? 'grey' : '#ddd'} 0 ${100 - starFill()}%`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            userSelect: 'none'
          }
          return (
            <small key={i} style={style}>★</small>
            )
        }) : null}
    </div>
  )
}