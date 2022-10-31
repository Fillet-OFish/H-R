import React, { useState, useEffect } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon,
         TwitterShareButton, TwitterIcon,
         PinterestShareButton, PinterestIcon } from "react-share";

export default function Social({ product, photo, style }) {
  const [valid, setValid] = useState(false)
  const [reveal, setReveal] = useState(false)
  const title = `Hack & Reactor: ${product.name}`

  // if the style is valid, setValid to true
  useEffect(()=>{
    if(Object.keys(style).length!==0) {
      style.photos[0].url ? setValid(true) : null
    }
  },[style])

  // hide/show social media buttons on user click
  function handleClick(){
    if(reveal) {
      document.querySelector('.social-icons').style.visibility = 'hidden'
      document.querySelector('.social-icons').style.top = '-1%'
      document.querySelector('.social-icons').style.opacity = '0'
    } else {
      document.querySelector('.social-icons').style.visibility = 'visible'
      document.querySelector('.social-icons').style.top = '6%'
      document.querySelector('.social-icons').style.opacity = '1'
    }
  }

  return(
    valid ?
    <>
      <div className="social" onClick={e=>{setReveal(!reveal);handleClick()}}>
        {reveal ? <span className="exit-icon">X</span> : <FaShareAlt className="share-icon"/>}
      </div>
      <div className="social-icons">
        {/* Facebook */}
        <FacebookShareButton
          quote={title}
          description={product.description}
          url='http://localhost:3000/' >
          <FacebookIcon size={25} round/>
        </FacebookShareButton>
        {/* Twitter */}
        <br/>
        <TwitterShareButton
          title={product.name}
          via='Hack & Reactor'
          url='http://localhost:3000/' >
          <TwitterIcon size={25} round/>
        </TwitterShareButton>
        <br/>
        {/* Pinterest */}
        <PinterestShareButton
          media={photo.url}
          url='http://localhost:3000/' >
          <PinterestIcon size={25} round/>
        </PinterestShareButton>
      </div>
    </>
      :
      null
  )
}