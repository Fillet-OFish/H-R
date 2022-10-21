import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrackProvider } from './TrackClickContext.jsx';
import Header from './header/index.jsx'
import Overview from './overview/index.jsx';
import Description from './overview/components/Description.jsx';
import RelatedItemsAndComparison from './relatedItemsAndComparison/index.jsx';
import QuesnAnsw from './qa/index.jsx';
import Ratings from './ratings/index.jsx'

export default function App() {
  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState([]);
  const [numReviews, setNumReviews] = useState(0);

  useEffect(() => {
    axios.get('/api/products/40344') // id 40344
    .then(result => setProduct(result.data))
  },[])

  return(
    product.id ?
    <TrackProvider>
      {/* header */}
      <Header product={product}/>

      {/* overview */}
      <div className="container">
        <Overview product={product} rating={rating} numReviews={numReviews}/>
      </div>
      <Description product={product}/>

      {/* related products */}
      <div className="container">
        <RelatedItemsAndComparison currentItem={product} setProduct={setProduct} />
      </div>

      {/* Questions and Answers */}
      <div className="container">
        <QuesnAnsw product={product} />
      </div>

      {/* Reviews */}
      <div className="container">
        <Ratings product={product} setRating={setRating} setNumReviews={setNumReviews}/>
      </div>
    </TrackProvider>
    : null
  )
}