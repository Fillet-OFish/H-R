import React, { useState, useEffect } from 'react';
import { useTracker } from '../contexts/TrackClickContext.jsx';
import { useDarkMode } from '../contexts/DarkMode.jsx'
import StarRatings from '../helper/StarRatings.jsx';
import axios from 'axios';
import Social from './components/product-info/Social.jsx'
import Styles from './components/product-info/Styles.jsx'
import Gallery from './components/gallery/Gallery.jsx'
import Cart from './components/product-info/Cart.jsx'

export default function Overview({product, rating, numReviews}) {
  const clickTracker = useTracker();
  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState({})
  const [photos, setPhotos] = useState([])
  const [photo, setPhoto] = useState('')
  const darkMode = useDarkMode()

  // on load/product change, set styles/style based on default product/new product
  useEffect(() => {
    axios.get(`/api/products/${product.id}/styles`)
    .then(result => {
      setStyles(result.data.results)
      setStyle(result.data.results[0])
      setPhotos(result.data.results[0].photos)
      setPhoto(result.data.results[0].photos[0])
    })
  },[product])

  const scroll = () => {
    document.querySelector('.gallery-scroll-to-here').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return(
    <div className="overview-container" onClick={(e)=>{clickTracker(e, 'Overview')}}>
        {/* Gallery */}
        {Object.keys(style).length!==0 && photos.length>0 ?
          <Gallery style={style} photos={photos} setPhotos={setPhotos} photo={photo} setPhoto={setPhoto}/>
        : null }

        <div className="right">
          {/* Stars */}

          <StarRatings itemRating={rating}/>
          &nbsp;
          {numReviews ?
            <span className="overview-to-reviews" onClick={e=>scroll()} >Read all {numReviews} reviews</span>
          : null}


          {/* Social media */}
          {<Social product={product} style={style} photo={photo}/>}

          {/* Category */}
          <p className="product-category">UNISEX / {product.category} / {product.name}</p>

          <div className="info-style-container">
            {/* Product name (dependent on if a default style exists) */}
            <div className="product-name">
              {style.photos && !style.photos[0].thumbnail_url ? <><p className="coming-soon">COMING SOON:</p><p className="product-name-null">{product.name}</p></> : product.name}
            </div>

            {/* Price (dependent on sale price) */}
            <p className="price">{style.sale_price ? (<><span style={{textDecoration: 'line-through', textDecorationThickness:'2px', textDecorationColor:'black',color:'gray'}}>${style.original_price}</span> ${style.sale_price}</>) : <>${style.original_price}</>}</p>

            {/* Styles */}
            <Styles styles={styles} style={style} setStyle={setStyle} />
          </div>
{/*
          {/* Cart */}
          <Cart style={style}/>
        </div>
    </div>
  )
}