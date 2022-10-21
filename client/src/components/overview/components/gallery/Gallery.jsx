import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaCompress, FaAngleUp, FaAngleDown, FaRegCircle, FaCircle } from 'react-icons/fa';
import Zoom from './Zoom.jsx'
import Carousel from './Carousel.jsx'

function usePrevious(value) { //credit: Ohans Emmanuel
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export default function Gallery({ style, photos, setPhotos }) {
  const [photo, setPhoto] = useState('')
  const [click, setClick] = useState(0)
  const [XY, setXY] = useState([0,7])
  const [expand, setExpand] = useState(true)
  const prevStyle = usePrevious(style)

  // on load/style change, set side photos and main photo to default
  useEffect(() => {
    setPhotos(style.photos)

    if (photos && !photo) {setPhoto(photos[0])}
    else {if(style!==prevStyle) {
      setClick(0)}
      setPhoto(style.photos[0])
    }
  },[style])

  // onClick function - input: img, output: change of gallery main photo
  function changePhoto(props) {
    let [index, newPhoto] = [props.i, props.photo]
    setPhoto(newPhoto)
    setClick(index)
  }

  // onClick function - input: direction, output: scroll up/down gallery list
  function scroll(direction){
    direction === 'up' ? setXY(prev => [prev[0]-1, prev[1]-1]) : setXY(prev => [prev[0]+1, prev[1]+1])
  }

  // onClick function to collapse/uncollapse gallery img
  function expandPhoto(prop){
    if(expand === true) {
      document.getElementsByClassName('gallery-list')[0].style.visibility = 'hidden'
      document.getElementsByClassName('img-main')[0].style = {cursor: 'zoom-out', marginTop:'-30%'}
      document.getElementsByClassName('right')[0].style.visibility = 'hidden'
      document.getElementsByClassName('left')[0].style = {width: '90vh', height:'70vh'}
    } else {
      document.getElementsByClassName('gallery-list')[0].style.visibility = 'visible'
      document.getElementsByClassName('right')[0].style.visibility = 'visible'
      document.getElementsByClassName('left')[0].style = {width: '70vh', height:'60vh'}
    }
  }

  return(
    <div className="left">
      {/* list of image thumbnails */}
      <div className="gallery-list">
        {photos ?
          (<div>
            {photos.length>6 ?
              <>
              {XY[0] === 0 ? null : <FaAngleUp style={{cursor:'pointer'}} onClick={e=>scroll('up')} className="gallery-arrow"/>}
              {photos.slice(XY[0], XY[1]).map((photo, i) => <p key={i}><img src={photo.thumbnail_url || "https://i.postimg.cc/gjFHrzW3/image-4.png"} onClick={e=>{e.preventDefault();changePhoto({photo, i})}} /></p>)}
              {XY[1] === photos.length ? null : <FaAngleDown style={{cursor:'pointer'}} onClick={e=>scroll('down')} className="gallery-arrow"/>}
              </>
              :
              photos.slice(XY[0], XY[1]).map((photo, i) => <p key={i}><img src={photo.thumbnail_url || "https://i.postimg.cc/gjFHrzW3/image-4.png"} onClick={e=>{e.preventDefault();changePhoto({photo, i})}} /></p>)
            }
          </div>) : null}
           </div>

      {/* main gallery */}
      <div className="gallery-main">
        {photo ?
          expand ?
            // reg view
            <>
              <Carousel photos={photos} click={click} setClick={setClick} setPhoto={setPhoto} setExpand={setExpand} expandPhoto={expandPhoto}/>
              <FaExpand  className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
            </>
            :
            // expanded view
            <>
              <Zoom src={photos[click].thumbnail_url} photos={photos} setClick={setClick} click={click} setExpand={setExpand} expandPhoto={expandPhoto}/>
              <FaCompress className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
            </>
        : null}
      </div>
    </div>
  )
}


