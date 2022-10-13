import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa'

export default function Styles({styles, style, setStyle}) {
 const [display, setDisplay] = useState([styles])
 console.log('styles', display)

  function set( prop ) {
    console.log('you clicked', prop)
    setStyle(prop)
  }

  return(
    <div>

      {/* price */}
      <p>{style.sale_price ? (<><span style={{textDecoration: 'line-through'}}>${style.original_price}</span> ${style.sale_price}</>) : <>${style.original_price}</>}</p>

      {/* style name */}
      <p>STYLE > {style.name}</p>

      {/* icons */}
      {styles.map(one =>
        <span key={one.style_id}>
          <img className="style-icon" src={one.photos[0].thumbnail_url} onClick={e => set(one)}/>
          {style.style_id===one.style_id ? <FaCheck/> : null} &nbsp;
        </span>
      )}

    </div>
  )
}