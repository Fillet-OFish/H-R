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
      {photos ? (<div>{photos.map(photo => <img key={photo.url} src={photo.thumbnail_url} />)}</div>) : null}
    </div>
  )
}