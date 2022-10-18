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
  overflow: "hidden"
}

const buttonStyle = {
  position: 'absolute',
  top: '50%',
  left: '-2%',

  fontSize: '22px',
  border: 'none',
  backgroundColor: 'transparent',

}

export default function YourOutfitList({currentItem, setProduct}) {

  const [outfit, setOutfit] = useState(() => {
      let outfit = JSON.parse(localStorage.getItem('outfit')) || [];
      return outfit;
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (!outfit.includes(currentItem.id)) {
      localStorage.setItem('outfit', JSON.stringify([...outfit, currentItem.id]));
      setOutfit([...outfit, currentItem.id]);
    }
  }


  return (
    <div style={{position: 'relative'}}>
      <h3>Your Outfit:</h3>
      <ul style={style}>
        <button style={buttonStyle} onClick={(e)=>{handleClick(e)}}>+</button>
        {outfit ? outfit.map((item) => <RelatedProduct setProduct={setProduct} key={item} item={item} list={'outfit'} />) : null}
      </ul>
    </div>
)

}