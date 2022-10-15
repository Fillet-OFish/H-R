import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header/index.jsx'
import Overview from './overview/index.jsx';
import RelatedItemsAndComparison from './relatedItemsAndComparison/RelatedItemsAndComparison.jsx'

export default function App() {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [product, setProduct] = useState([]) // one product (needed for page render)
  const [update, setUpdate] = useState(false)
  const [productRating, setProductRating] = useState([]); //set current product's rating

  console.log('productRating: ', productRating)


  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
      .catch(err => console.log(err));
    axios.get(`/api/products/${40344}`) // id 40344
      .then(result => setProduct(result.data))
      .catch(err => console.log(err));
    axios.get(`/api/reviews/${40344}`)
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
      .catch(err => {console.log(err)})
  },[update])


  return(<>
    <Header product={product}/>
    <div className="container">
      <Overview product={product}/>

      {product.id ? <RelatedItemsAndComparison currentItem={product} setProduct={setProduct} /> : null }
    </div>

    </>)
}