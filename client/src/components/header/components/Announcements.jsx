import React, { useState, useEffect } from 'react';

export default function Announcements() {

  const [name, setName] = useState('announcement-fade-in')
  const [count, setCount] = useState(0)
  const [textArr, setTextArr] = useState([
    <>New windproof fleeces. <a href='/'>SHOP WOMEN</a> - <a href='/'>SHOP MEN</a></>,
    <>Get early access on launches and offers. <a href='/'>Sign Up For Texts</a></>,
    <>15* off your first purchase - use code NEW15.</>])
  const[text, setText] = useState(textArr[0])

  useEffect(() => {
    const timeout = setInterval(() => {
      if (name === 'announcement-fade-in') {
        setName('announcement-fade-out')
        count+1 !== textArr.length ? setCount(count+1): setCount(0)
      } else {
        setText(textArr[count]);
        setName('announcement-fade-in')
      }
    }, 4000);

    return () => clearInterval(timeout)

  }, [name])

  function byeAnnouncements(){
    document.querySelector('.announcement').style.display = 'none'
  }

  return(
    <div className='announcement'>
      <p className={name}>{text}</p>
      <span className="exit-announcement" onClick={byeAnnouncements}>X</span>
    </div>
  )
}