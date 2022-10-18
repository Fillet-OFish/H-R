import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa'

export default function Styles({ styles, style, setStyle, noDefault }) {
 const [display, setDisplay] = useState([styles])
 const [img, setImg] = useState('')

  // onClick function - changes style
  function set( prop ) {
    setStyle(prop)
  }

  return(
    <div className="styles">
      {/* style name */}
      <p><span className="style-name">STYLE ></span><span className="selected-style"> {style.name}</span></p>

      {/* icons */}
      <p className="icons">

      {/* checking if there is a default style or not */}
      {noDefault ?
        styles.map(one =>
          <span key={one.style_id} className="styles-icon-container">
            <img className="style-icon" src="https://i.postimg.cc/2ywh6z69/image-2.png" onClick={e => {set(one)}} style={{opacity:'0.5'}}/>
            {style.style_id===one.style_id ? <FaCheck className="check-icon"/> : null}
          </span>)
      : styles.map(one =>
        <span key={one.style_id} className="styles-icon-container">
          <img className="style-icon" src={one.photos[0].thumbnail_url} onClick={e => {set(one)}}/>
          {style.style_id===one.style_id ? <FaCheck className="check-icon"/> : null}
        </span>)
      }

      </p>
    </div>
  )
}