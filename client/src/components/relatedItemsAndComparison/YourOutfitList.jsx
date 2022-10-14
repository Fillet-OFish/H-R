import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx'

export default function YourOutfitList({currentItem}) {

  const [outfit, setOutfit] = useState(() => {
      let outfit = JSON.parse(localStorage.getItem('outfit')) || [];
      return outfit;
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (!outfit.includes(currentItem)) {
      localStorage.setItem('outfit', JSON.stringify([...outfit, currentItem]));
      setOutfit([...outfit, currentItem]);
    }
  }

  console.log('outfit', outfit)


  return (
    <div>
      <ul>Your Outfit:<br></br>
        <button onClick={(e)=>{handleClick(e)}}>+</button>
        {outfit ? outfit.map((item) => <RelatedProduct key={item} item={item} />) : null}
      </ul>
    </div>
)

}