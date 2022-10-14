import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

export default function RelatedProductsList ({currentItem, setProduct}) {


  console.log('relatedProductsList')

  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    axios.get(`/api/products/${currentItem.id}/related`)
      .then(data => {console.log('data', data.data); setRelatedItems(data.data)})
      .catch(err => console.log(err));
  }, [currentItem])

  return (
    <ul>Related Products:
      {relatedItems.map((item) => (<RelatedProduct setProduct={setProduct} key={item} item={item}/>))}
    </ul>
  )
}