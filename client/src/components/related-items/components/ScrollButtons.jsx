import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { useDarkMode } from '../../DarkMode.jsx'


export default function scrollButtons({element, scroll}) {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [showButtonL, setShowButtonL] = useState(false);
  const [showButtonR, setShowButtonR] = useState(true);
  const [width, setWidth] = useState(0)
  const darkMode = useDarkMode();

  function handleResize() {
    const el = document.querySelector(element);
    setWidth(el?.clientWidth);
    if (el?.scrollWidth > el?.clientWidth) {
      setScrollVisible(true)
    } else {
      setScrollVisible(false)
    }
    if (el?.scrollLeft === 0) {
      setShowButtonL(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("mouseover", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseover", handleResize);
    }
  }, [])


  const buttonL = () => {
    const el = document.querySelector(element);
    if (el?.scrollWidth - (el?.scrollLeft - scroll) > width) {
      setShowButtonR(true);
    }
    if (el?.scrollLeft - scroll <= 0) {
      setTimeout(()=>setShowButtonL(false), 300)
    }
    el?.scrollBy(-scroll, 0);
  }

  const buttonR = () => {
    const el = document.querySelector(element);
    setShowButtonL(true);
    if (el?.scrollWidth - (el?.scrollLeft + scroll) <= width) {
      setTimeout(()=>setShowButtonR(false), 300)
    }
    el?.scrollBy(scroll, 0);
  }

  return(
    scrollVisible ?
    <div>
      {showButtonL ? <button className={`button-left ${darkMode? 'button-left-dark' : null}`} onClick={buttonL}>
          <FaAngleLeft/>
      </button> : null }
      {showButtonR ? <button className={`button-right ${darkMode? 'button-right-dark' : null}`} onClick={buttonR}>
          <FaAngleRight/>
      </button> : null }
    </div>
    : null
  )
}




