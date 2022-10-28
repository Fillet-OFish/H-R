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
    return () => source.cancel();
  }, [currentItem])

  const style = show ? {height: '100%', opacity: '1'} : {}

  return (
    <>
      <h3 className='list-title' onClick={() => setShow(!show)}>Related Products {show ? <FaSortUp className='FaSortUpButton' /> : <FaSortDown />}</h3>
      <div className='related-list' style={style}>
        <ul className='related-ul'>
          {relatedItems.map((item, index) => (
            <ProductCard currentItem={currentItem} setProduct={setProduct} key={currentItem + item + index} item={item} list={'related'}/>
          ))}
        </ul>
        <ScrollButtons element={'.related-list .related-ul'} scroll={236} />
      </div>
    </>
  )
}