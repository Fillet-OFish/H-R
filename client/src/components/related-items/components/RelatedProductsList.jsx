import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx'
import { FaSortDown, FaSortUp } from 'react-icons/fa';


export default function RelatedProductsList ({currentItem, setProduct}) {
  const [relatedItems, setRelatedItems] = useState([])
<<<<<<< HEAD
  const [show, setShow] = useState(true)
=======
  const [show, setShow] = useState(false)
>>>>>>> master


  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
    .then(data => {setRelatedItems(data.data)})
    .catch(err => console.log(err));
  }, [currentItem])

  const style = show ? {height: '100%', opacity: '1'} : {}
<<<<<<< HEAD
  const h3Style = show ? {cursor: 'pointer'} : {cursor: 'pointer', borderBottom: '1px solid #3c4044'}

  return (
    <>
      <h3 style={h3Style} onClick={() => setShow(!show)}>Related Products {show ? null : <FaSortDown />}</h3>
=======

  return (
    <>
      <h3 style={{cursor: 'pointer', borderBottom: '1px solid #3c4044'}} onClick={() => setShow(!show)}>Related Products {show ? <FaSortUp /> : <FaSortDown />}</h3>
>>>>>>> master
      <div className='related-list' style={style}>
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