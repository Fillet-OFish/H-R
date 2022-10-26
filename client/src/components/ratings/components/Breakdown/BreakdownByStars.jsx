import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../../../DarkMode.jsx'


export default function BreakdownByStars({ reviews, reviewsMeta, numReviews, filter, setFilter }) {
  const [breakdown, setBreakdown] = useState(null)
  const [ratingCount, setRatingCount] = useState(null)
  const [recommend, setRecommend] = useState(null);
  const darkMode = useDarkMode();

  useEffect(() => {
    if (reviewsMeta) {
      const ratingCount = {
        one: Number(reviewsMeta.ratings[1]),
        two: Number(reviewsMeta.ratings[2]),
        three: Number(reviewsMeta.ratings[3]),
        four: Number(reviewsMeta.ratings[4]),
        five: Number(reviewsMeta.ratings[5])
      };
      const ratingBreakdown = {one: 0, two: 0, three: 0, four: 0, five: 0};
      const reviewRecommends = {count: Number(reviewsMeta.recommended.true), breakdown: 0};
      ratingBreakdown.one = Math.round((ratingCount.one / numReviews) * 100) / 100;
      ratingBreakdown.two = Math.round((ratingCount.two / numReviews) * 100) / 100;
      ratingBreakdown.three = Math.round((ratingCount.three / numReviews) * 100) / 100;
      ratingBreakdown.four = Math.round((ratingCount.four / numReviews) * 100) / 100;
      ratingBreakdown.five = Math.round((ratingCount.five / numReviews) * 100) / 100;
      reviewRecommends.breakdown = Math.round((reviewRecommends.count / numReviews) * 100) / 100;
      setRatingCount(ratingCount);
      setBreakdown(ratingBreakdown);
      setRecommend(reviewRecommends.breakdown);
    }
  }, [reviews])

  const styleFive = () => ({
    display: 'inline-block',
    width: '100%',
    height: '10px',
    background: `linear-gradient(90deg, ${darkMode ? 'green' : 'black'} ${(breakdown.five * 100)}%, #ddd 0 ${100 - (breakdown.five * 100)}%`
  })
  const styleFour = () => ({
    display: 'inline-block',
    width: '100%',
    height: '10px',
    background: `linear-gradient(90deg, ${darkMode ? 'green' : 'black'} ${(breakdown.four * 100)}%, #ddd 0 ${100 - (breakdown.four * 100)}%`
  })
  const styleThree = () => ({
    display: 'inline-block',
    width: '100%',
    height: '10px',
    background: `linear-gradient(90deg, ${darkMode ? 'green' : 'black'} ${(breakdown.three * 100)}%, #ddd 0 ${100 - (breakdown.three * 100)}%`
  })
  const styleTwo = () => ({
    display: 'inline-block',
    width: '100%',
    height: '10px',
    background: `linear-gradient(90deg, ${darkMode ? 'green' : 'black'} ${(breakdown.two * 100)}%, #ddd 0 ${100 - (breakdown.two * 100)}%`
  })
  const styleOne = () => ({
    display: 'inline-block',
    width: '100%',
    height: '10px',
    background: `linear-gradient(90deg, ${darkMode ? 'green' : 'black'} ${(breakdown.one * 100)}%, #ddd 0 ${100 - (breakdown.one * 100)}%`
  })

  const clickHandler = (rating) => {
    if (filter.includes(rating)) {
      const i = filter.indexOf(rating);
      const newFilter = filter.slice(0, i).concat(filter.slice(i + 1));
      setFilter(newFilter);
    } else {
      setFilter([...filter, rating])
    }
  }

  const removeAllFilters = (e) => {
    setFilter([]);
  }

  return(
    <>
      {breakdown && ratingCount && recommend ?
        <div className='rating-breakdown'>
        <span className='title'>Rating breakdown</span>

        <p>{recommend * 100}% recommend this product</p>

        <div className="star-bars">
          {filter.length > 0 ?
            <span className='filter-applied'>
              filters applied: <br/>
              {filter.join(', ')}<br/>
              <button onClick={removeAllFilters}>Remove all filters</button><br/>
            </span>
          : null}

          {/* 5 stars bar */}
          <div className="star-bar">
            <div className="bar-left">
              <small className='star-breakdown'>5 stars</small>
            </div>
            <div className="bar-middle">
              <span style={styleFive()}></span>
            </div>
            <div className="bar-right">
              <small>{ratingCount.five}</small>
            </div>
          </div>

          {/* 4 stars bar */}
          <div className="star-bar">
            <div className="bar-left">
              <small className='star-breakdown' onClick={() => clickHandler('4 stars')}>4 stars</small>
            </div>
            <div className="bar-middle">
              <span style={styleFour()}></span>
            </div>
            <div className="bar-right">
              <small>{ratingCount.four}</small>
            </div>
          </div>

          {/* 3 stars bar */}
          <div className="star-bar">
            <div className="bar-left">
              <small className='star-breakdown' onClick={() => clickHandler('4 stars')}>3 stars</small>
            </div>
            <div className="bar-middle">
              <span style={styleThree()}></span>
            </div>
            <div className="bar-right">
              <small>{ratingCount.three}</small>
            </div>
          </div>

          {/* 2 stars bar */}
          <div className="star-bar">
            <div className="bar-left">
              <small className='star-breakdown' onClick={() => clickHandler('2 stars')}>2 stars</small>
            </div>
            <div className="bar-middle">
              <span style={styleTwo()}></span>
            </div>
            <div className="bar-right">
              <small>{ratingCount.two}</small>
            </div>
          </div>

          {/* 1 star bar */}
          <div className="star-bar">
            <div className="bar-left">
              <small className='star-breakdown' onClick={() => clickHandler('1 stars')}>1 star</small>
            </div>
            <div className="bar-middle">
              <span style={styleOne()}></span>
            </div>
            <div className="bar-right">
              <small>{ratingCount.one }</small>
            </div>
          </div>
        </div>

        </div>
      : null}
    </>
  )
}