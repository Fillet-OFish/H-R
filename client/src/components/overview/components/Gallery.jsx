import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import Zoom from './Zoom.jsx'
import Carousel from './Carousel.jsx'

function usePrevious(value) { //credit: Ohans Emmanuel
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export default function Gallery({ style }) {
  const [photos, setPhotos] = useState([])
  const [photo, setPhoto] = useState('')
  const [click, setClick] = useState(0)
  const [expand, setExpand] = useState(true)
  const prevStyle = usePrevious(style)
  const newPhotos = useRef(style.photos)

  // on load/style change, set side photos and main photo to default
  useEffect(() => {
    // handle no default image
    setPhotos(style.photos)

    if(photos && !photo){setPhoto(photos[0])}
    else{
      if(photos!==newPhotos && style!==prevStyle) {
        setPhoto(newPhotos[0])
      }
    }

  },[{style}])

  // onClick function - input: img, output: change of gallery main photo
  function changePhoto(props) {
    let [index, curPhoto] = [props.i, props.photo]
    setPhoto(curPhoto)
    setClick(index)
  }

  // onClick function to collapse/uncollapse gallery img
  function expandPhoto(prop){
    if(expand === true) {
      document.getElementsByClassName('img-main')[0].style.width = '1000px'
      document.getElementsByClassName('img-main')[0].style.cursor = 'zoom-out'
      document.getElementsByClassName('right')[0].style.visibility = 'hidden'
    } else {
      document.getElementsByClassName('img-main')[0].style.width = '500px'
      document.getElementsByClassName('img-main')[0].style.cursor = 'zoom-in'
      document.getElementsByClassName('right')[0].style.visibility = 'visible'
    }
  }

  return(
    <div className="left">
      <div className="gallery-list">{photos ? (<div>{photos.map((photo, i) => <p key={i}><img src={photo.thumbnail_url || "https://i.postimg.cc/gjFHrzW3/image-4.png"} onClick={e=>{e.preventDefault();changePhoto({photo, i})}} /></p>)}</div>) : null}</div>
      <div className="gallery-main">
        {photo ?
          expand ?
            <>
              <Carousel photos={photos} click={click} setPhoto={setPhoto} setExpand={setExpand} expandPhoto={expandPhoto}/>
              <FaExpand  className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
            </>
            :
            <>
              <Zoom src={photo.thumbnail_url} setExpand={setExpand} expandPhoto={expandPhoto}/>
              <FaCompress className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
            </>
        : null}
      </div>
    </div>
  )
}


