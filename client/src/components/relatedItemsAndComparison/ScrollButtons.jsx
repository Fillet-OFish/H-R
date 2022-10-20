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
<<<<<<< HEAD
    if (el.scrollLeft - scroll <= 0) {
=======
    if (el.scrollLeft - scroll === 0) {
>>>>>>> master
      setTimeout(()=>setShowButtonL(false), 500)
    }
    el.scrollBy(-scroll, 0);
  }

  const buttonR = () => {
    const el = document.querySelector(element);
    setShowButtonL(true);
<<<<<<< HEAD
    if (el.scrollWidth - (el.scrollLeft + scroll) <= width) {
=======
    if (el.scrollWidth - (el.scrollLeft + scroll) === width) {
>>>>>>> master
      setTimeout(()=>setShowButtonR(false), 500)
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




