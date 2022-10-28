import React, { useState } from 'react';
import ScrollButtons from './ScrollButtons.jsx'

export default function PreviewCarousel({styles, setDefaultPhoto}) {

  const noPhoto = 'https://i.postimg.cc/gjFHrzW3/image-4.png';

  return (
    <div className='preview-photos'>
      <div className='preview-carousel'>
        {styles.results.map(style => {
          if (!style['default?']) {
            return style.photos.map((photo, index) => (
              <img key={index} className='preview-image' src={photo.thumbnail_url || noPhoto} onClick={(e) => {setDefaultPhoto(photo.thumbnail_url);}}></img>
            ))
          }
        })}
      </div>
      <ScrollButtons element={'.preview-carousel'} scroll={192.75} />
    </div>
  )
}