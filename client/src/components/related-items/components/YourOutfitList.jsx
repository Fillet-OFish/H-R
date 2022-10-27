import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import ScrollButtons from './ScrollButtons.jsx';
import { useDarkMode } from '../../DarkMode.jsx';
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
  const h3Style = show ? {cursor: 'pointer'} : {cursor: 'pointer', borderBottom: '1px solid #3c4044'}


  return (
    <>
      <h3 style={h3Style} onClick={() => setShow(!show)}>Your Outfit {show ? null : <FaSortDown />}</h3>
      <div className='related-list' style={outfitStyle}>
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