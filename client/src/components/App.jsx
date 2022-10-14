import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header/index.jsx'
import Overview from './overview/index.jsx';
import RelatedItemsAndComparison from './relatedItemsAndComparison/RelatedItemsAndComparison.jsx'

export default function App() {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [product, setProduct] = useState([]) // one product (needed for page render)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
    axios.get(`/api/products/${40344}`)
      .then(result => setProduct(result.data))
  },[update])


  return(<>
    <Header product={product}/>
    <div className="container">
      <Overview product={product}/>

      {/* {product.id ? <RelatedItemsAndComparison currentItem={product.id} /> : null } */}
    </div>

    </>)
}