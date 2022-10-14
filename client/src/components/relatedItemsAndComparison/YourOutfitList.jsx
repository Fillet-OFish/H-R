import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx'

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

  console.log('outfit', outfit)


  return (
    <div>
      <ul>Your Outfit:<br></br>
        <button onClick={(e)=>{handleClick(e)}}>+</button>
        {outfit ? outfit.map((item) => <RelatedProduct setProduct={setProduct} key={item} item={item} />) : null}
      </ul>
    </div>
)

}