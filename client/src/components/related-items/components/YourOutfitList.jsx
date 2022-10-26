import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx';
import { useDarkMode } from '../../DarkMode.jsx';

export default function YourOutfitList({currentItem, setProduct}) {
  const [outfit, setOutfit] = useState(() => (JSON.parse(localStorage.getItem('outfit')) || []));
  const darkMode = useDarkMode();

  const handleClick = () => {
    if (!outfit.includes(currentItem.id)) {
      localStorage.setItem('outfit', JSON.stringify([...outfit, currentItem.id]));
      setOutfit([currentItem.id, ...outfit]);
    }
  }

  return (
    <>
      <h3>Your Outfit</h3>
      <div className='related-list'>
        <ul className='outfit-ul'>
          <div>
            <li className={`add-to-outfit-button ${darkMode ? 'add-to-outfit-button-dark' : null}`} onClick={handleClick}>
              <p>Add To Outfit</p>
            </li>
          </div>
          {outfit ? outfit.map(item =>
            <ProductCard setProduct={setProduct} key={item} item={item} list={'outfit'} outfit={outfit} setOutfit={setOutfit} />) : null
          }
        </ul>
      {outfit.length > 3 ?
        <ScrollButtons element={'.related-list .outfit-ul'} width={1100} scroll={275}  /> : null
      }
      </div>
    </>
  )
}