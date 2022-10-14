import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/index.jsx';
import Search from './reviews/components/Search.jsx';
import RelatedItemsAndComparison from './relatedItemsAndComparison/RelatedItemsAndComparison.jsx'

export default function App() {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [product, setProduct] = useState([]) // one product (needed for page render)
  const [update, setUpdate] = useState(false)

  console.log('product', product)

  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
    axios.get(`/api/products/${40344}`) // id 40344
      .then(result => setProduct(result.data))
  },[update])


  return(<>
    <div className="header">Logo <Search/></div>
    <div className="container">
      {/* <Overview product={product}/> */}

      {product.id ? <RelatedItemsAndComparison currentItem={product} setProduct={setProduct} /> : null }
    </div>

    </>)
}