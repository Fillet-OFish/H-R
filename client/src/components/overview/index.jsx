import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './Styles.jsx'
import Gallery from './Gallery.jsx'

export default function Overview() {
  const [products, setProducts] = useState([])
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data[0])}) // id 40344
    axios.get(`/api/products/${40344}/styles`)
      .then(result => {
        // let temp = [...result.data.results[0]];
        setStyles(result.data.results);
        setStyle(result.data.results[0])
      })
  },[update])

  console.log('index', style)

  return(
    <div>
      <h1>Overview</h1>
      {products.name}
      <Gallery style={style}/>
      <Styles styles={styles} style={style} setStyle={setStyle}/>
    </div>
  )
}