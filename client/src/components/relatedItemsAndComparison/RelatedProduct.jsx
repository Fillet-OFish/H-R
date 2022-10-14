import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';

export default function RelatedProduct({item, setProduct}) {

  console.log('relatedProduct', item)

  const [currentItem, setCurrentItem] = useState([])

  useEffect(() => {
    axios.get(`/api/products/${item}`)
      .then((data) => {setCurrentItem(data.data)})
      .catch((err) => {console.log(err)})
  }, [item])

  const clickHandler = function (e) {
    e.preventDefault();
    setProduct(currentItem);
  }

  return (
    <div onClick={(e) => {clickHandler(e)}}>
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
