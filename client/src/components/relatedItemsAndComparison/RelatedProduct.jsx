import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';

export default function RelatedProduct({item}) {

  const [currentItem, setCurrentItem] = useState(() => {
    axios.get(`/api/products/${item}`)
      .then((data) => {setCurrentItem(data.data)})
      .catch((err) => {console.log(err)})
  })

  return (
    <div>
      {currentItem ?
        <li>
          <h3>{currentItem.name}</h3>
          <div>{currentItem.slogan}</div>
          <div>{currentItem.description}</div>
          <div>${currentItem.default_price}</div>
        </li>
        : null
      }
    </div>
  )
}
