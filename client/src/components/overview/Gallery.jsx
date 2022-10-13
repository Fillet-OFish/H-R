import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Gallery({style}) {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    setPhotos(style.photos)
  })

  // console.log('made it to gallery', style.photos)
  console.log('gallery photos', photos)

  return(
    <div>
      photos
      {/* {photos ? (<div>{JSON.stringify(photos)}</div>) : null} */}
      {/* {style.photos.map(photo => <img src={photo.thumbnail_url} />)} */}
      {/* {style.photos.map(photo => <img src={photo.thumbnail_url} />)} */}

    </div>
  )
}