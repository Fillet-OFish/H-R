import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './Styles.jsx'
import Gallery from './Gallery.jsx'
import Cart from './Cart.jsx'

export default function Overview({product}) {
  console.log('overview', product)
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if(product){
      axios.get(`/api/products/${40344}/styles`)
        .then(result => {
          setStyles(result.data.results);
          setStyle(result.data.results[0])
        })
    } else{
      axios.get(`/api/products/${40344}/styles`)
        .then(result => {
          setStyles(result.data.results);
          setStyle(result.data.results[0])
        })
    }
  },[update])

  return(
    <div>
      <div className="container">
        {/* Gallery */}
        <Gallery style={style}/>

        <div className="right">
          {/* Stars */}
          <p>★★★★☆ Read all reviews</p>
          {/* Category */}
          <p>{product.category}</p>

          {/* Product name */}
          <h2>{product.name}</h2>

          {/* Styles */}
          <Styles styles={styles} style={style} setStyle={setStyle}/>

          {/* Cart */}
          <Cart style={style}/>
        </div>
      </div>
    </div>
  )
}