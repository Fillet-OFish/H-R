import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './components/Styles.jsx'
import Gallery from './components/Gallery.jsx'
import Cart from './components/Cart.jsx'

export default function Overview({product}) {
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState([])

  useEffect(() => {
    if(product && product.length!==0){
      axios.get(`/api/products/${product.id}/styles`)
        .then(result => {
          setStyles(result.data.results);
          setStyle(result.data.results[0])
        })
    }
  },[product])

  return(
    <>
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
    </>
  )
}