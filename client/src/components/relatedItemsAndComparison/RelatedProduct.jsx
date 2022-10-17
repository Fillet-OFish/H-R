import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import StarRatings from './StarRatings.jsx'


const style = {
  border: '1px solid grey ',
  margin: '8px',
  overflow: 'hidden',
  width: '230px',
<<<<<<< HEAD
  height: '360px',
=======
  height: '340px',
>>>>>>> master
  cursor: 'pointer'
}

const imageStyle = {
  width: '100%',
  height: '70%',
  objectFit: 'cover'
}

const smallStyle = {
  color: 'grey',
  margin: '10px 0 10px 0'
}

export default function RelatedProduct({item, setProduct}) {

  const [currentItem, setCurrentItem] = useState([]);
  const [defaultStyle, setDefaultStyle] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get(`/api/products/${item}`, {cancelToken: source.token})
      .then((data) => {setCurrentItem(data.data)})
      .catch((err) => {console.log(err)});

    axios.get(`/api/products/${item}/styles`, {cancelToken: source.token})
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
  }, [])

  const clickHandler = function (e) {
    e.preventDefault();
    setProduct(currentItem);
  }




  return (
    <div>
      {currentItem && defaultStyle.photos ?
        <li style={style} onClick={(e) => {clickHandler(e)}} >
          <img style={imageStyle} src={defaultStyle.photos[0].thumbnail_url}></img>
          <div style={{padding: '5px 10px 0 10px' }}>
            <small style={smallStyle}>{currentItem.category}</small>
            <div style={{height: '30px', padding: '3px 0 3px 0', fontSize: '13px'}}>{currentItem.name + ' - ' + currentItem.slogan}</div>
            <div>{defaultStyle.sale_price ?
              <div>
                <p style={{color: 'red'}}>${defaultStyle.sale_price}</p>
                <small style={smallStyle, {textDecoration: 'line-through'}}>${defaultSTyle.original_price}</small>
              </div>
              : <small style={smallStyle}>${defaultStyle.original_price}</small>}</div>
            <StarRatings item={item} />
          </div>
        </li>
        : null
      }
    </div>
  )
}
