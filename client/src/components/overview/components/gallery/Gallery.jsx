import React, { useState, useEffect, useRef } from 'react';
import { FaExpand, FaCompress, FaAngleUp, FaAngleDown, FaRegCircle, FaCircle } from 'react-icons/fa';
import Zoom from './Zoom.jsx'
import Carousel from './Carousel.jsx'

function usePrevious(value) { //credit: Ohans Emmanuel (article on how to reference previous states)
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export default function Gallery({ style, photos, setPhotos, photo, setPhoto }) {
  const [click, setClick] = useState(0)
  const [XY, setXY] = useState([0,7])
  const [expand, setExpand] = useState(true)
  const prevStyle = usePrevious(style)

  useEffect(() => {
    // on load/style change, set side photos and main photo to default
    setPhotos(style.photos)
    setPhoto(style.photos[0])
    if(style!==prevStyle) {setClick(0)}
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
    if(expand === true && photo.thumbnail_url) {
      window.scrollTo({ top: 150, behavior: 'smooth' })
      document.querySelector('.gallery-list').style.display = 'none'
      document.querySelector('.gallery-main').style.height = '73vh'
      document.querySelector('.right').style.visibility = 'hidden'
      document.querySelector('.middle').style.margin = '0 auto'
      document.querySelector('.contain-description-related').style.marginTop = '10%'
      document.querySelector('.contain-description-related').style.transition = 'all .25s ease-in-out'
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      document.querySelector('.gallery-list').style.display = 'flex'
      document.querySelector('.gallery-main').style.height = '65vh'
      document.querySelector('.right').style.visibility = 'visible'
      document.querySelector('.contain-description-related').style.marginTop = '-3%'
      document.querySelector('.middle').style.margin = '0'
    }
  }

  return(<>
    <div className="left">
      {/* list of image thumbnails */}
      <div className="gallery-list">
        {photos?
          (<div>
            {photos.length>6 ?
              <>
              {XY[0] === 0 ? null : <FaAngleUp style={{cursor:'pointer'}} onClick={e=>scroll('up')} className="gallery-arrow"/>}
              {photos.slice(XY[0], XY[1]).map((photo, i) =>
                <div className="solo-img-container" key={i}>
                  <img className="solo-img" src={photo.thumbnail_url} alt="list of thumbnail images" onClick={e=>{changePhoto({photo, i})}} />
                </div>)}
              {XY[1] === photos.length ? null : <FaAngleDown style={{cursor:'pointer'}} onClick={e=>scroll('down')} className="gallery-arrow"/>}
              </>
              :
              photos.slice(XY[0], XY[1]).map((photo, i) =>
                <div className="solo-img-container" key={i}>
                  <img className="solo-img" src={photo.thumbnail_url || "https://i.postimg.cc/gjFHrzW3/image-4.png"} alt="list of thumbnail images" onClick={e=>{e.preventDefault();changePhoto({photo, i})}} />
                </div>)
            }
          </div>) : null}
      </div>
    </div>

      {/* main gallery */}
    <div className="middle">
        <div className="gallery-main">
          {photo ?
            !expand && photo.thumbnail_url ?
              // expanded view
              <>
                <Zoom src={photos[click].url} photos={photos} setClick={setClick} click={click} setExpand={setExpand} expandPhoto={expandPhoto}/>
                <FaCompress className="compress-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
              </>
              :
              // reg view
              <>
                <Carousel photos={photos} click={click} setClick={setClick} setPhoto={setPhoto} setExpand={setExpand} expandPhoto={expandPhoto}/>
                {photo.thumbnail_url ? <FaExpand  className="expand-icon" onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/> : null}
              </>

          : null}
        </div>
      </div>
    </>
  )
}

