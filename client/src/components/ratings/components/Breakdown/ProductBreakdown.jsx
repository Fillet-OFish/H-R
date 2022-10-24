import React, { useState, useEffect } from 'react';

export default function ProductBreakdown({ rating, product, numReviews, reviews, reviewsMeta, filter, setFilter }) {

  const size = reviewsMeta.characteristics.Size;
  const width = reviewsMeta.characteristics.Width;
  const comfort = reviewsMeta.characteristics.Comfort;
  const quality = reviewsMeta.characteristics.Quality;
  const length = reviewsMeta.characteristics.Length;
  const fit = reviewsMeta.characteristics.Fit;

  const ratingBarStyle = {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '10px',
    background: '#ddd'
  }

  const rangeStyle1 = {
    flexBasis: '33%',
    display: 'inline-block',
    textAlign: 'left'
  }
  const rangeStyle2 = {
    flexBasis: '33%',
    display: 'inline-block',
    textAlign: 'center'
  }
  const rangeStyle3 = {
    flexBasis: '33%',
    display: 'inline-block',
    textAlign: 'right'
  }
  const ratingValueStyle = (characteristics) => ({
    position: 'absolute',
    transform:  'translate(-50%, -50%)',
    top: '30%',
    left: `${((characteristics.value - 1)/4) * 100}%`,
    fontSize: 'large'
  })

  return(
    <div>
      {size ?
        <div>Size<br/>
          <span style={ratingBarStyle}>
            <div style={ratingValueStyle(size)}>😬</div>
          </span>
          <span style={{display: 'flex'}}>
            <small style={rangeStyle1}>too small</small>
            <small style={rangeStyle2}>perfect</small>
            <small style={rangeStyle3}>too big</small>
          </span>
        </div>
      : null}
      {width ?
        <div>Width<br/>
          <span style={ratingBarStyle}>
            <div style={ratingValueStyle(width)}>😬</div>
          </span>
          <span style={{display: 'flex'}}>
            <small style={rangeStyle1}>too narrow</small>
            <small style={rangeStyle2}>perfect</small>
            <small style={rangeStyle3}>too wide</small>
          </span>
        </div>
      : null}
      {comfort ?
        <div>Comfort<br/>
          <span style={ratingBarStyle}>
            <div style={ratingValueStyle(comfort)}>😬</div>
          </span>
          <span style={{display: 'flex'}}>
            <small style={rangeStyle1}>uncomfortable</small>
            <small style={rangeStyle2}>okay</small>
            <small style={rangeStyle3}>perfect</small>
          </span>
        </div>
      : null}
      {quality ?
        <div>Quality<br/>
          <span style={ratingBarStyle}>
            <div style={ratingValueStyle(quality)}>😬</div>
          </span>
          <span style={{display: 'flex'}}>
            <small style={rangeStyle1}>poor</small>
            <small style={rangeStyle2}>what i expected</small>
            <small style={rangeStyle3}>perfect</small>
          </span>
        </div>
      : null}
      {length ?
        <div>Length<br/>
          <span style={ratingBarStyle}>
            <div style={ratingValueStyle(length)}>😬</div>
          </span>
          <span style={{display: 'flex'}}>
            <small style={rangeStyle1}>runs short</small>
            <small style={rangeStyle2}>perfect</small>
            <small style={rangeStyle3}>runs long</small>
          </span>
        </div>
      : null}
      {fit ?
        <div>Fit<br/>
          <span style={ratingBarStyle}>
            <div style={ratingValueStyle(fit)}>😬</div>
          </span>
          <span style={{display: 'flex'}}>
            <small style={rangeStyle1}>runs tight</small>
            <small style={rangeStyle2}>perfect</small>
            <small style={rangeStyle3}>runs long</small>
          </span>
        </div>
      : null}
    </div>
  )
}