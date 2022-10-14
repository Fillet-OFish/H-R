import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';

const style = {
  borderStyle: 'solid',
  borderWidth: '1px',
  listStyleType: 'none',
  margin: '8px',
  overflow: 'hidden',
  width: '230px',
  height: '340px'
}

const imageStyle = {
  width: '100%',
  height: '70%',
  objectFit: 'cover'
}

export default function RelatedProduct({item, setProduct}) {

  const [currentItem, setCurrentItem] = useState([])
  const [defaultStyle, setDefaultStyle] = useState([])

  useEffect(() => {
    axios.get(`/api/products/${item}`)
      .then((data) => {setCurrentItem(data.data)})
      .catch((err) => {console.log(err)});
    axios.get(`/api/products/${item}/styles`)
      .then((data) => {
        for (var i = 0; i < data.data.results.length; i++) {
          if (data.data.results[i]['default?']) {
            setDefaultStyle(data.data.results[i]);
            return;
          }
          if (i === data.data.results.length - 1) {
            setDefaultStyle(data.data.results[0]);
          }
        }
      })
      .catch((err) => {console.log(err)});
  }, [item])

  const clickHandler = function (e) {
    e.preventDefault();
    setProduct(currentItem);
  }




  return (
    <div>
      {currentItem && defaultStyle.photos ?
        <li style={style} onClick={(e) => {clickHandler(e)}} >
          <img style={imageStyle} src={defaultStyle.photos[0].thumbnail_url}></img>
          <div>{currentItem.category}</div>
          <div>{currentItem.name}</div>
          <div>${currentItem.default_price}</div>
          <div>rating</div>
        </li>
        : null
      }
    </div>
  )
}
