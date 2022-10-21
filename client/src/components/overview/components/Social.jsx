import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon,
         TwitterShareButton, TwitterIcon,
         PinterestShareButton, PinterestIcon } from "react-share";

export default function Social({product}) {
  const [reveal, setReveal] = useState(false)
  const title = `Hack & Reactor: ${product.name}`

  function handleClick(){
    reveal?
    document.querySelector('.social-icons').style.visibility = 'hidden'
    :
    document.querySelector('.social-icons').style.visibility = 'visible'
  }

  return(
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
}