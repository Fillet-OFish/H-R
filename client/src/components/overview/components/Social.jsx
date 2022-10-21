<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
import { FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon,
         TwitterShareButton, TwitterIcon,
         PinterestShareButton, PinterestIcon } from "react-share";

<<<<<<< HEAD
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

  function handleClick(){
    reveal ?
=======
export default function Social({product}) {
  const [reveal, setReveal] = useState(false)
  const title = `Hack & Reactor: ${product.name}`

  function handleClick(){
    reveal?
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
    document.querySelector('.social-icons').style.visibility = 'hidden'
    :
    document.querySelector('.social-icons').style.visibility = 'visible'
  }

  return(
<<<<<<< HEAD
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
          media={photo.thumbnail_url}
          url='http://localhost:3000/' >
          <PinterestIcon size={25} round/>
        </PinterestShareButton>
      </div>
    </>
      :
      null
  )
=======
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
      {document.querySelector('.img-main') ?
        <PinterestShareButton
        media={document.querySelector('.img-main').src}
        url='http://localhost:3000/' >
          <PinterestIcon size={25} round/>
        </PinterestShareButton>
      : null}

    </div>
  </>)
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
}