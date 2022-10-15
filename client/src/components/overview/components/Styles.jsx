import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa'

export default function Styles({styles, style, setStyle}) {
 const [display, setDisplay] = useState([styles])

  function set( prop ) {
    setStyle(prop)
  }

  return(
    <div className="styles">
      {/* price */}
      <p className="price">{style.sale_price ? (<><span style={{textDecoration: 'line-through'}}>${style.original_price}</span> ${style.sale_price}</>) : <>${style.original_price}</>}</p>

      {/* style name */}
      <p><span className="style-name">STYLE ></span><span className="selected-style"> {style.name}</span></p>

      {/* icons */}
      {styles.map(one =>
        <span key={one.style_id} className="styles-icon-container">
          <img className="style-icon" src={one.photos[0].thumbnail_url} onClick={e => {set(one)}}/>
          {style.style_id===one.style_id ? <FaCheck className="check-icon"/> : null}
        </span>
      )}
    </div>
  )
}