import React, { useState } from 'react';
import PreviewCarousel from './PreviewCarousel.jsx';

export default function ProductCardImage({defaultStyle, styles}) {

  const [hover, setHover] = useState(false);
  const [defaultPhoto, setDefaultPhoto] = useState(defaultStyle.photos[0].thumbnail_url)

  const noPhoto = 'https://i.postimg.cc/gjFHrzW3/image-4.png';

  return (
    <div className='product-card-photo' onMouseEnter={() => setHover(true)} onMouseLeave={() => {
      setTimeout(()=>{setHover(false)}, 300);
      }}>
      <img src={defaultPhoto || noPhoto}></img>
      {hover ? <PreviewCarousel styles={styles} setDefaultPhoto={setDefaultPhoto} /> : null}
    </div>
  )
}