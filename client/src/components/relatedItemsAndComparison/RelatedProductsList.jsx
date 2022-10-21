import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx'

export default function RelatedProductsList ({currentItem, setProduct}) {
  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
    .then(data => {setRelatedItems(data.data)})
    .catch(err => console.log(err));
  }, [currentItem])

  return (
    <>
      <h3>Related Products:</h3>
      <div className='related-list'>
        <ul className='related-ul'>
          {relatedItems.map(item => (
            <ProductCard currentItem={currentItem} setProduct={setProduct} key={item} item={item} list={'related'}/>
            ))
          }
        </ul>
        {relatedItems.length > 4 ?
          <ScrollButtons element={'.related-list .related-ul'} width={1100} scroll={275} />
          : null
        }
      </div>
    </>
  )
}