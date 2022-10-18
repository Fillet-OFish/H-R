import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx'

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



export default function YourOutfitList({currentItem, setProduct}) {

  const [outfit, setOutfit] = useState(() => {
    let outfit = JSON.parse(localStorage.getItem('outfit')) || [];
    return outfit;
  }
  );
  const [hideButton, setHideButton] = useState({buttonL: 'transparent', cursorL: 'default', buttonR: 'grey', cursorR: 'pointer'})
  const [hover, setHover] = useState(false)

  const liStyle = {
    position: 'relative',
    backgroundColor: (hover ? 'lightgrey' : 'white' ),
    border: '1px solid lightgrey ',
    margin: '8px',
    overflow: 'hidden',
    width: '257px',
    height: '380px',
    cursor: 'pointer',
    borderRadius: '6px'
  }

  const buttonStyle = {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    fontSize: '22px',
    fontWeight: 'normal',
    border: 'none',
    color: (hover ? 'black' : 'grey'),
    backgroundColor: 'transparent',
  }

  const buttonLStyle = {
    position: 'absolute',
    top: '50%',
    left: '-2%',

    fontSize: '22px',
    border: 'none',
    backgroundColor: 'transparent',
    color: hideButton.buttonL,
    cursor: hideButton.cursorL
  }

  const buttonRStyle = {
    position: 'absolute',
    top: '50%',
    left: '100%',

    fontSize: '22px',
    border: 'none',
    backgroundColor: 'transparent',
    color: hideButton.buttonR,
    cursor: hideButton.cursorR
  }


  const handleClick = (e) => {
    e.preventDefault();
    if (!outfit.includes(currentItem.id)) {
      localStorage.setItem('outfit', JSON.stringify([...outfit, currentItem.id]));
      setOutfit([...outfit, currentItem.id]);
    }
  }

  const buttonL = (e) => {
    e.preventDefault();

    if (e.target.nextSibling.scrollWidth - (e.target.nextSibling.scrollLeft -275) > 1100) {
      setHideButton({...hideButton, buttonR: 'grey', cursorR: 'pointer'})
    }
    if (e.target.nextSibling.scrollLeft - 275 === 0) {
      setHideButton({...hideButton, buttonL: 'transparent', cursorL: 'default'})
    }

    document.querySelector('.scrollOutfit').scrollBy(-275, 0)
  }

  const buttonR = (e) => {
    e.preventDefault();

    setHideButton({...hideButton, buttonL: 'grey', cursorL: 'pointer'})
    if (e.target.previousSibling.scrollWidth - (e.target.previousSibling.scrollLeft + 275) === 1100) {
      setHideButton({...hideButton, buttonR: 'transparent', cursorR: 'default'})
    }

    document.querySelector('.scrollOutfit').scrollBy(275, 0)
  }


  return (
    <div style={{position: 'relative'}}>
      <h3>Your Outfit:</h3>
      {outfit.length > 4 ? <button style={buttonLStyle} onClick={(e) => {buttonL(e)}}>{'<'}</button> : null}

      <ul className='scrollOutfit' style={style}>
        <div style={{position: 'relative'}}>
          <li style={liStyle} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            <button style={buttonStyle} onClick={(e)=>{handleClick(e)}}>Add To Outfit</button>
          </li>
        </div>
        {outfit ? outfit.map((item) => <RelatedProduct setProduct={setProduct} key={item} item={item} list={'outfit'} outfit={outfit} setOutfit={setOutfit} />) : null}
      </ul>
      {outfit.length > 4 ? <button style={buttonRStyle} onClick={(e) => {buttonR(e)}}>{'>'}</button> : null}

    </div>
)

}