import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export default function scrollButtons({element, width, scroll}) {
  const [showButtonL, setShowButtonL] = useState(false);
  const [showButtonR, setShowButtonR] = useState(true);

  const buttonL = () => {
    const el = document.querySelector(element);
    if (el.scrollWidth - (el.scrollLeft - scroll) > width) {
      setShowButtonR(true);
    }
    if (el.scrollLeft - scroll <= 0) {
      setTimeout(()=>setShowButtonL(false), 300)
    }
    el.scrollBy(-scroll, 0);
  }

  const buttonR = () => {
    const el = document.querySelector(element);
    setShowButtonL(true);
    if (el.scrollWidth - (el.scrollLeft + scroll) <= width) {
      setTimeout(()=>setShowButtonR(false), 300)
    }
    el.scrollBy(scroll, 0);
  }

  return(
    <div>
      {showButtonL ? <button className='button-left' onClick={buttonL}>
          <FaAngleLeft/>
      </button> : null }
      {showButtonR ? <button className='button-right' onClick={buttonR}>
          <FaAngleRight/>
      </button> : null }
    </div>
  )
}




