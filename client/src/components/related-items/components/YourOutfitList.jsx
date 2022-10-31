import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx';
import { useDarkMode } from '../../../contexts/DarkMode.jsx';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

export default function YourOutfitList({currentItem, setProduct}) {
  const [outfit, setOutfit] = useState(() => (JSON.parse(localStorage.getItem('outfit')) || []));
  const [show, setShow] = useState(false)
  const darkMode = useDarkMode();

  const handleClick = () => {
    if (!outfit.includes(currentItem.id)) {
      localStorage.setItem('outfit', JSON.stringify([...outfit, currentItem.id]));
      setOutfit([currentItem.id, ...outfit]);
    }
  }

  const outfitStyle = show ? {height: '100%', opacity: '1'} : {}

  return (
    <>
      <h3 className='list-title' onClick={() => setShow(!show)}>Your Outfit {show ? <FaSortUp className='FaSortUpButton' /> : <FaSortDown />}</h3>
      <div className='related-list' style={outfitStyle}>
        <ul className='outfit-ul'>
          <div>
            <li className={`add-to-outfit-button ${darkMode ? 'add-to-outfit-button-dark' : null}`} onClick={handleClick}>
              <p>Add To Outfit</p>
            </li>
          </div>
          {outfit?.map(item => (
              <ProductCard setProduct={setProduct} key={item} item={item} list={'outfit'} outfit={outfit} setOutfit={setOutfit} />
          ))}
        </ul>
        <ScrollButtons element={'.related-list .outfit-ul'} scroll={236} />
      </div>
    </>
  )
}