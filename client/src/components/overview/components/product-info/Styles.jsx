import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function Styles({ styles, style, setStyle }) {
 const [display, setDisplay] = useState([styles])
 const [img, setImg] = useState('')

  return(
    <div className="styles">
      {/* style name */}
      <p><span className="style-name">STYLE ></span><span className="selected-style"> {style.name}</span></p>

      {/* icons */}
      <p className="icons">

      {/* checking if there is a default style or not */}
      {styles.map(styleItem =>
        <span key={styleItem.style_id} className="styles-icon-container">
          <img className="style-icon" src={styleItem.photos[0].thumbnail_url || "https://i.postimg.cc/2ywh6z69/image-2.png"} onClick={e => {setStyle(styleItem)}}/>
          {style.style_id===styleItem.style_id ? <FaCheck className="check-icon"/> : null}
        </span>)
      }
      </p>
    </div>
  )
}