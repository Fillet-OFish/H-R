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
<<<<<<< HEAD
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
=======
  const [products, setProducts] = useState([]); // list of all products (needed for search bar)
  const [product, setProduct] = useState([]); // one product (needed for page render)
  const [update, setUpdate] = useState(false);
  const [productRating, setProductRating] = useState([]); //set current product's rating

  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
    axios.get('/api/products/40344') // id 40344
    .then(result => setProduct(result.data))

    if(product.id) {
      axios.get(`/api/reviews/${product.id}`)
      .then((data) => {
        let rating = {};
        rating.count = data.data.count;
        let average = 0
        for (var i = 0; i < data.data.results.length; i++) {
          average += data.data.results[i].rating
          if (i === data.data.results.length - 1) {
            average = average / data.data.results.length
          }
        }
        rating.average = average;
        setProductRating(rating);
      })
    }
  },[update])


  return(<TrackProvider>
    {/* header */}
    <Header product={product}/>

    {/* overview */}
    <div className="container">
      {product.id ? <Overview product={product} rating={productRating}/> : null}
    </div>
    <Description product={product}/>

    {/* related products */}
    <div className="container">
      {product.id ? <RelatedItemsAndComparison currentItem={product} setProduct={setProduct} /> : null }
    </div>

    {/* Questions and Answers */}
    <div className="container">
      <QuesnAnsw product={product} />
    </div>
  </TrackProvider>)
>>>>>>> 08d7314e0b31d489faeaabf4fc5813ad26271e10
}