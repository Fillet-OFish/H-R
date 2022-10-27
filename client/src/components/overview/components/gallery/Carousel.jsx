import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Carousel({ photos, click, setClick, setPhoto, setExpand, expandPhoto }) {
  const length = photos.length;

  function next(){
    setClick(click + 1)
    setPhoto(photos[click+1])
  }

  function prev(){
    setClick(click - 1)
    setPhoto(photos[click-1])
  }

  return (
    <div className='carousel-container'>
      {click!==0 ? <FaAngleLeft className='left-arrow' onClick={prev} /> : <span className="left-blocked">O</span>}
      {click!==length-1? <FaAngleRight className='right-arrow' onClick={next} />: <span className="right-blocked">O</span>}
      {photos[click].thumbnail_url ?
        <img
          src={`${photos[click].thumbnail_url}`}
          className='img-main'
          onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}
          style={{cursor:'zoom-in'}}/>
        :
        <img src="https://i.postimg.cc/gjFHrzW3/image-4.png" className='img-main' onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
      }
    </div>
  );
};