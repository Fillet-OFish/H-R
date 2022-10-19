import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export default function Carousel({ photos, click, setPhoto, setExpand, expandPhoto }) {
  const [current, setCurrent] = useState(click);
  const length = photos.length;

  function next(){
    setCurrent(current === length - 1 ? 0 : current + 1);
    setPhoto(photos[current+1])
  }

  function prev(){
    setCurrent(current === 0 ? length - 1 : current - 1)
    setPhoto(photos[current+1])
  }

  useEffect(() => {
    if(click!==0){setCurrent(click)}
  }, [click])

  return (
    <div className='carousel-container'>
      {current!==0 ? <FaAngleLeft className='left-arrow' onClick={prev} /> : null}
      {current!==length-1? <FaAngleRight className='right-arrow' onClick={next} />:null}
      <img src={`${photos[current].thumbnail_url || "https://i.postimg.cc/gjFHrzW3/image-4.png" }`} className='img-main' onClick={e=>{setExpand(prev=>!prev);expandPhoto()}}/>
    </div>
  );
};
