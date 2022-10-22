import React, { useState, useEffect } from 'react';

export default function BreakdownByStars({ reviews, filter, setFilter }) {
  const [breakdown, setBreakdown] = useState(null)
  const [ratingCount, setRatingCount] = useState(null)
  const [recommend, setRecommend] = useState(null);

  useEffect(() => {
    if (reviews.length > 0) {
      const ratingCount = {one: 0, two: 0, three: 0, four: 0, five: 0};
      const ratingBreakdown = {one: 0, two: 0, three: 0, four: 0, five: 0};
      const reviewRecommends = {count: 0, breakdown: 0};
      for (var i = 0; i < reviews.length; i++) {
        if (reviews[i].recommend) {
          reviewRecommends.count++;
        }
        if (reviews[i].rating === 1) {
          ratingCount.one++;
        }
        if (reviews[i].rating === 2) {
          ratingCount.two++;
        }
        if (reviews[i].rating === 3) {
          ratingCount.three++;
        }
        if (reviews[i].rating === 4) {
          ratingCount.four++;
        }
        if (reviews[i].rating === 5) {
          ratingCount.five++;
        }
      }
      ratingBreakdown.one = Math.round((ratingCount.one / reviews.length) * 100) / 100;
      ratingBreakdown.two = Math.round((ratingCount.two / reviews.length) * 100) / 100;
      ratingBreakdown.three = Math.round((ratingCount.three / reviews.length) * 100) / 100;
      ratingBreakdown.four = Math.round((ratingCount.four / reviews.length) * 100) / 100;
      ratingBreakdown.five = Math.round((ratingCount.five / reviews.length) * 100) / 100;
      reviewRecommends.breakdown = Math.round((reviewRecommends.count / reviews.length) * 100) / 100;
      setRatingCount(ratingCount);
      setBreakdown(ratingBreakdown);
      setRecommend(reviewRecommends.breakdown);
    }
  }, [reviews])

  const styleFive = () => ({
    display: 'inline-block',
    width: '100px',
    height: '10px',
    background: `linear-gradient(90deg, green ${(breakdown.five * 100)}%, #ddd 0 ${100 - (breakdown.five * 100)}%`
  })
  const styleFour = () => ({
    display: 'inline-block',
    width: '100px',
    height: '10px',
    background: `linear-gradient(90deg, green ${(breakdown.four * 100)}%, #ddd 0 ${100 - (breakdown.four * 100)}%`
  })
  const styleThree = () => ({
    display: 'inline-block',
    width: '100px',
    height: '10px',
    background: `linear-gradient(90deg, green ${(breakdown.three * 100)}%, #ddd 0 ${100 - (breakdown.three * 100)}%`
  })
  const styleTwo = () => ({
    display: 'inline-block',
    width: '100px',
    height: '10px',
    background: `linear-gradient(90deg, green ${(breakdown.two * 100)}%, #ddd 0 ${100 - (breakdown.two * 100)}%`
  })
  const styleOne = () => ({
    display: 'inline-block',
    width: '100px',
    height: '10px',
    background: `linear-gradient(90deg, green ${(breakdown.one * 100)}%, #ddd 0 ${100 - (breakdown.one * 100)}%`
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
        <div className='rating-breakdown'> Rating Breakdown <br/>
          {filter.length > 0 ?
            <span className='filter-applied'>
              filters applied: <br/>
              {filter.join(', ')}<br/>
              <button onClick={removeAllFilters}>Remove all filters</button>
            </span>
          : null}
          <small className='star-breakdown' onClick={() => clickHandler('5 stars')}>
            5 stars <span style={styleFive()}
            ></span>
            {ratingCount.five}
          </small><br/>
          <small className='star-breakdown' onClick={() => clickHandler('4 stars')}>
            4 stars <span style={styleFour()}></span>
            {ratingCount.four}
          </small><br/>
          <small className='star-breakdown' onClick={() => clickHandler('3 stars')}>
            3 stars <span style={styleThree()}></span>
            {ratingCount.three}
          </small><br/>
          <small className='star-breakdown' onClick={() => clickHandler('2 stars')}>
            2 stars <span style={styleTwo()}></span>
            {ratingCount.two}
          </small><br/>
          <small className='star-breakdown' onClick={() => clickHandler('1 stars')}>
            1 stars <span style={styleOne()}></span>
            {ratingCount.one}
          </small><br/>
          <span>{recommend * 100}% of reviews recommend this product</span>
        </div>
      : null}
    </>
  )
}