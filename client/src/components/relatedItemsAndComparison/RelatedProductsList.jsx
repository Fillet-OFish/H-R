import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

const style = {
  display: 'grid',
  gridAutoFlow: 'column',
  maxWidth: '1000px',
  width: '100%',
  overflowX: 'auto',
  overflow: "hidden",
  scrollSnapType: 'inline mandatory',
  scrollPaddingInline: '50px'
}

const buttonLStyle = {
  position: 'absolute',
  top: '50%',
  left: '-3%',

  fontSize: '22px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'grey',
  cursor: 'pointer'
}

const buttonRStyle = {
  position: 'absolute',
  top: '50%',
  left: '103%',

  fontSize: '22px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'grey',
  cursor: 'pointer'
}


export default function RelatedProductsList ({currentItem, setProduct}) {

  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
      .then(data => {setRelatedItems(data.data)})
      .catch(err => console.log(err));
  }, [currentItem])

  const buttonL = (e) => {
    e.preventDefault();
    document.querySelector('.scroll').scrollBy(-350, 0)
  }

  const buttonR = (e) => {
    e.preventDefault();
    document.querySelector('.scroll').scrollBy(350, 0)
  }


  return (
    <div style={{position: 'relative'}}>
      <h3>Related Products:</h3>
      <button style={buttonLStyle} onClick={(e) => {buttonL(e)}}>{'<'}</button>
      <ul className='scroll' style={style}>
        {relatedItems.map((item) => (<RelatedProduct setProduct={setProduct} key={item} item={item} list={'related'}/>))}
      </ul>
      <button style={buttonRStyle} onClick={(e) => {buttonR(e)}}>{'>'}</button>
    </div>
  )
}