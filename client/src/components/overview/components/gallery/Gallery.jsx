import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaCompress, FaAngleUp, FaAngleDown, FaRegCircle, FaCircle } from 'react-icons/fa';
import Zoom from './Zoom.jsx'
import Carousel from './Carousel.jsx'

<<<<<<< HEAD
function usePrevious(value) { //credit: Ohans Emmanuel (article on how to reference previous states)
=======
function usePrevious(value) { //credit: Ohans Emmanuel
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

<<<<<<< HEAD
export default function Gallery({ style, photos, setPhotos, photo, setPhoto }) {
=======
export default function Gallery({ style, photos, setPhotos }) {
  const [photo, setPhoto] = useState('')
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
  const [click, setClick] = useState(0)
  const [XY, setXY] = useState([0,7])
  const [expand, setExpand] = useState(true)
  const prevStyle = usePrevious(style)

<<<<<<< HEAD
  useEffect(() => {
    // on load/style change, set side photos and main photo to default
    setPhotos(style.photos)
    setPhoto(style.photos[0])
    if(style!==prevStyle) {setClick(0)}
=======
  // on load/style change, set side photos and main photo to default
  useEffect(() => {
    setPhotos(style.photos)

    if (photos && !photo) {setPhoto(photos[0])}
    else {if(style!==prevStyle) {
      setClick(0)}
      setPhoto(style.photos[0])
    }
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
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
<<<<<<< HEAD
    if(expand === true && photo.thumbnail_url) {
      document.querySelector('.gallery-list').style.visibility = 'hidden'
      document.querySelector('.img-main').style = {cursor: 'zoom-out', marginTop:'-30%'}
      document.querySelector('.right').style.visibility = 'hidden'
      document.querySelector('.left').style = {width: '90vh', height:'70vh'}
    } else {
      document.querySelector('.gallery-list').style.visibility = 'visible'
      document.querySelector('.right').style.visibility = 'visible'
      document.querySelector('.left').style = {width: '70vh', height:'60vh'}
=======
    if(expand === true) {
      document.getElementsByClassName('gallery-list')[0].style.visibility = 'hidden'
      document.getElementsByClassName('img-main')[0].style = {cursor: 'zoom-out', marginTop:'-30%'}
      document.getElementsByClassName('right')[0].style.visibility = 'hidden'
      document.getElementsByClassName('left')[0].style = {width: '90vh', height:'70vh'}
    } else {
      document.getElementsByClassName('gallery-list')[0].style.visibility = 'visible'
      document.getElementsByClassName('right')[0].style.visibility = 'visible'
      document.getElementsByClassName('left')[0].style = {width: '70vh', height:'60vh'}
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
    }
  }

  return(
    <div className="left">
      {/* list of image thumbnails */}
      <div className="gallery-list">
<<<<<<< HEAD
        {photos?
=======
        {photos ?
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
          (<div>
            {photos.length>6 ?
              <>
              {XY[0] === 0 ? null : <FaAngleUp style={{cursor:'pointer'}} onClick={e=>scroll('up')} className="gallery-arrow"/>}
<<<<<<< HEAD
              {photos.slice(XY[0], XY[1]).map((photo, i) => <p key={i}><img src={photo.thumbnail_url} onClick={e=>{changePhoto({photo, i})}} /></p>)}
=======
              {photos.slice(XY[0], XY[1]).map((photo, i) => <p key={i}><img src={photo.thumbnail_url || "https://i.postimg.cc/gjFHrzW3/image-4.png"} onClick={e=>{e.preventDefault();changePhoto({photo, i})}} /></p>)}
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
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
<<<<<<< HEAD
          !expand && photo.thumbnail_url ?
            // expanded view
            <>
              <Zoom src={photos[click].thumbnail_url} photos={photos} setClick={setClick} click={click} setExpand={setExpand} expandPhoto={expandPhoto}/>
              <FaCompress className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
            </>
            :
            // reg view
            <>
              <Carousel photos={photos} click={click} setClick={setClick} setPhoto={setPhoto} setExpand={setExpand} expandPhoto={expandPhoto}/>
              {photo.thumbnail_url ? <FaExpand  className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/> : null}
            </>

=======
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
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
        : null}
      </div>
    </div>
  )
}


