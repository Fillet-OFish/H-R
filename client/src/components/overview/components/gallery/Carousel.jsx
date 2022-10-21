import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Carousel({ photos, click, setClick, setPhoto, setExpand, expandPhoto }) {
  const [current, setCurrent] = useState(click);
  const length = photos.length;

  function next(){
    setClick(current + 1)
    setPhoto(photos[current+1])
  }

  function prev(){
    setClick(current - 1)
    setPhoto(photos[current-1])
  }

  useEffect(() => {
    setCurrent(click)
  }, [click])

  return (
    <div className='carousel-container'>
      {current!==0 ? <FaAngleLeft className='left-arrow' onClick={prev} /> : null}
      {current!==length-1? <FaAngleRight className='right-arrow' onClick={next} />:null}
      {photos[current].thumbnail_url ?
        <img
          src={`${photos[current].thumbnail_url}`}
          className='img-main'
          onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}
          style={{cursor:'zoom-in'}}/>
        :
        <img src="https://i.postimg.cc/gjFHrzW3/image-4.png" className='img-main' onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
      }
    </div>
  );
};
