import React, { useState, useEffect } from 'react';

export default function Gallery({style}) {
  const [photos, setPhotos] = useState([])
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    setPhotos(style.photos)
    if(photos && !photo){setPhoto(photos[0])}
    // else if(photos && photo){setPhoto(photos[0])}
  },[{}])

  function changePhoto(prop) {
    console.log('changePhoto', prop)
    setPhoto(prop)
  }

  return(
    <div className="left">
      <div className="gallery-list">{photos ? (<div>{photos.map(photo => <img key={photo.url} src={photo.thumbnail_url} onClick={e=>{e.preventDefault();changePhoto(photo)}} />)}</div>) : null}</div>
      <div className="gallery-main">{photo ? (<img src={photo.thumbnail_url}/>) : null}</div>

    </div>
  )
}