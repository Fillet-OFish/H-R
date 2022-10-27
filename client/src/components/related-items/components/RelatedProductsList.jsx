import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx'
import { FaSortDown, FaSortUp } from 'react-icons/fa';


export default function RelatedProductsList ({currentItem, setProduct}) {
  const [relatedItems, setRelatedItems] = useState([])
  const [show, setShow] = useState(true)


  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
    .then(data => {setRelatedItems(data.data)})
    .catch(err => console.log(err));
  }, [currentItem])

  const style = show ? {height: '100%', opacity: '1'} : {}

  return (
    <>
      <h3 className='list-title' onClick={() => setShow(!show)}>Related Products {show ? null : <FaSortDown />}</h3>
      <div className='related-list' style={style}>
        <ul className='related-ul'>
          {relatedItems.map(item => (
            <ProductCard currentItem={currentItem} setProduct={setProduct} key={item} item={item} list={'related'}/>
            ))
          }
        </ul>
        {relatedItems.length > 4 ?
          <ScrollButtons element={'.related-list .related-ul'} width={1100} scroll={236} />
          : null
        }
      </div>
    </>
  )
}