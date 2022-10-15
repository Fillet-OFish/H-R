import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';

function usePrevious(value) { //credit: Ohans Emmanuel
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export default function Gallery({style}) {
  const [photos, setPhotos] = useState([])
  const [photo, setPhoto] = useState('')
  const [expand, setExpand] = useState(true)
  const prevStyle = usePrevious(style)
  const newPhotos = useRef(style.photos)

  useEffect(() => {
    setPhotos(style.photos)
    if(photos && !photo){setPhoto(photos[0])}
    else{
      if(photos!==newPhotos && style!==prevStyle) {
        setPhoto(newPhotos[0])
      }
    }
  },[{}])

  function changePhoto(prop) {
    setPhoto(prop)
  }

  function expandPhoto(prop){
    if(expand=== true) {
      document.getElementsByClassName('img-main')[0].style.width = '1000px'
      document.getElementsByClassName('right')[0].style.visibility = 'hidden'
    } else {
      document.getElementsByClassName('img-main')[0].style.width = '500px'
      document.getElementsByClassName('right')[0].style.visibility = 'visible'
    }
  }

  return(
    <div className="left">
      <div className="gallery-list">{photos ? (<div>{photos.map(photo => <p><img key={photo.url} src={photo.thumbnail_url} onClick={e=>{e.preventDefault();changePhoto(photo)}} /></p>)}</div>) : null}</div>
      <div className="gallery-main">
        {photo ?
          (<>
            <img className="img-main" src={photo.thumbnail_url}/>
            {expand ?
              <FaExpand  className="expand-icon" onClick={e=>{setExpand(!expand);expandPhoto()}}/>
              : <FaCompress className="expand-icon" onClick={e=>{setExpand(!expand);expandPhoto()}}/>}
          </>)
        : null}
      </div>

    </div>
  )
}
