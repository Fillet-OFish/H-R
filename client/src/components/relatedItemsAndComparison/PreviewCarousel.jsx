import React, { useState } from 'react';
import ScrollButtons from './ScrollButtons.jsx'

export default function PreviewCarousel({styles, setDefaultPhoto}) {

  const noPhoto = 'https://i.postimg.cc/gjFHrzW3/image-4.png';

  const clickHandler = (img) => {
    setDefaultPhoto(img)
  }

  return (
    <div className='preview-photos'>
      <div className='preview-carousel'>
        {styles.results.map(style => {
          if (!style['default?']) {
            return style.photos.map(photo => (
              <img key={Math.random() * 9999} className='preview-image' src={photo.thumbnail_url || noPhoto} onClick={() => clickHandler(photo.thumbnail_url)}></img>
            ))
          }
        })}
      </div>
      <ScrollButtons element={'.preview-carousel'} width={257} scroll={192.75} />
    </div>
  )
}