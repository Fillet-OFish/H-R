import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

export default function RelatedProductsList ({currentItem}) {

  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    axios.get(`/api/products/${currentItem}/related`)
      .then(data => {console.log('data', data.data); setRelatedItems(data.data)})
      .catch(err => console.log(err));
  }, [])

  return (
    <ul>Related Products:
      {relatedItems.map((item) => (<RelatedProduct key={item} item={item}/>))}
    </ul>
  )
}