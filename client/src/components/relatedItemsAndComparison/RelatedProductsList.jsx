import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

const style = {
  display: 'flex',
  margin: '0',
  padding: '0',
  maxWidth: '1100px',
  width: '100%',
  overflowX: 'auto',
  overflow: "hidden",
  scrollBehavior: 'smooth'
}



export default function RelatedProductsList ({currentItem, setProduct}) {

  const [relatedItems, setRelatedItems] = useState([])
  const [hideButton, setHideButton] = useState({buttonL: 'transparent', cursorL: 'default', buttonR: 'grey', cursorR: 'pointer'})


  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
    .then(data => {setRelatedItems(data.data)})
    .catch(err => console.log(err));
  }, [currentItem])

  const buttonLStyle = {
    position: 'absolute',
    top: '50%',
    left: '-2%',

    fontSize: '28px',
    border: 'none',
    backgroundColor: 'transparent',
    color: hideButton.buttonL,
    cursor: hideButton.cursorL
  }

  const buttonRStyle = {
    position: 'absolute',
    top: '50%',
    left: '100%',

    fontSize: '28px',
    border: 'none',
    backgroundColor: 'transparent',
    color: hideButton.buttonR,
    cursor: hideButton.cursorR
  }


  const buttonL = (e) => {
    e.preventDefault();

    if (e.target.nextSibling.scrollWidth - (e.target.nextSibling.scrollLeft - 275) > 1100) {
      setHideButton({...hideButton, buttonR: 'grey', cursorR: 'pointer'})
    }
    if (e.target.nextSibling.scrollLeft - 275 === 0) {
      setHideButton({buttonR: 'grey', cursorR: 'pointer', buttonL: 'transparent', cursorL: 'default'})
    }

    document.querySelector('.scroll').scrollBy(-275, 0)
  }

  const buttonR = (e) => {
    e.preventDefault();

    setHideButton({...hideButton, buttonL: 'grey', cursorL: 'pointer'})
    if (e.target.previousSibling.scrollWidth - (e.target.previousSibling.scrollLeft + 275) === 1100) {
      setHideButton({buttonL: 'grey', cursorL: 'pointer', buttonR: 'transparent', cursorR: 'default'})
    }


    document.querySelector('.scroll').scrollBy(275, 0)
  }

  return (
    <div style={{position: 'relative'}}>
      <h3>Related Products:</h3>
      {relatedItems.length > 4 ? <button style={buttonLStyle} onClick={(e) => {buttonL(e)}}>{'<'}</button> : null}
      <ul className='scroll' style={style}>
        {relatedItems.map((item) => (<RelatedProduct  setProduct={setProduct} key={item} item={item} list={'related'}/>))}
      </ul>
      {relatedItems.length > 4 ? <button style={buttonRStyle} onClick={(e) => {buttonR(e)}}>{'>'}</button> : null}
    </div>
  )
}