import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './components/Styles.jsx'
import Gallery from './components/Gallery.jsx'
import Cart from './components/Cart.jsx'

export default function Overview({product, rating}) {
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState([])
  const [update, setUpdate] = useState(false)

  // on load/product change, set styles/style based on default product/new product
  useEffect(() => {
    if(product && product.length!==0){
      if(product.id!==null) {
        axios.get(`/api/products/${product.id}/styles`)
        .then(result => {
          setStyles(result.data.results);
          setStyle(result.data.results[0])
        })
      }
    }
  },[product])

  return(
    <>
        {/* Gallery */}
        <Gallery update={update} style={style}/>

        <div className="right">
          {/* Stars */}
          <p>★★★★☆ <a href="/">Read all reviews</a></p>

          {/* Category */}
          <p className="product-category">UNISEX / {product.category} / {product.name}</p>

          {/* Product name */}
          <p className="product-name">{product.name}</p>

          {/* price */}
          <p className="price">{style.sale_price ? (<><span style={{textDecoration: 'line-through', textDecorationThickness:'2px', textDecorationColor:'black',color:'gray'}}>${style.original_price}</span> ${style.sale_price}</>) : <>${style.original_price}</>}</p>

          {/* Styles */}
          <Styles setUpdate={setUpdate} styles={styles} style={style} setStyle={setStyle}/>

          {/* Cart */}
          <Cart style={style}/>
        </div>
    </>
  )
}