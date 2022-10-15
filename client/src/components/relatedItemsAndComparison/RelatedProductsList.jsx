import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

const style = {
  display: 'flex'
}

export default function RelatedProductsList ({currentItem, setProduct}) {

  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    axios.get(`/api/products/${currentItem.id}/related`)
      .then(data => {setRelatedItems(data.data)})
      .catch(err => console.log(err));
  }, [currentItem])


  return (
    <div>
      <h3>Related Products:</h3>
      <ul style={style}>
        {relatedItems.map((item) => (<RelatedProduct setProduct={setProduct} key={item} item={item}/>))}
      </ul>
    </div>
  )
}