import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export default function YourOutfitList({currentItem, setProduct}) {
  const [outfit, setOutfit] = useState(() => (JSON.parse(localStorage.getItem('outfit')) || []));
  const [hideButtonL, setHideButtonL] = useState({button: 'transparent', cursor: 'default'});
  const [hideButtonR, setHideButtonR] = useState({button: 'grey', cursor: 'pointer'});

  const buttonLStyle = {
    color: hideButtonL.button,
    cursor: hideButtonL.cursor
  }

  const buttonRStyle = {
    color: hideButtonR.button,
    cursor: hideButtonR.cursor
  }

  const handleClick = () => {
    if (!outfit.includes(currentItem.id)) {
      localStorage.setItem('outfit', JSON.stringify([...outfit, currentItem.id]));
      setOutfit([currentItem.id, ...outfit]);
    }
  }

  const buttonL = () => {
    const el = document.querySelector('.related-list .outfit-ul');
    if (el.scrollWidth - (el.scrollLeft - 275) > 1100) {
      setHideButtonR({button: 'grey', cursor: 'pointer'});
    }
    if (el.scrollLeft - 275 === 0) {
      setHideButtonL({button: 'transparent', cursor: 'default'});
    }
    el.scrollBy(-275, 0);
  }

  const buttonR = () => {
    const el = document.querySelector('.related-list .outfit-ul');
    setHideButtonL({button: 'grey', cursor: 'pointer'});
    if (el.scrollWidth - (el.scrollLeft + 275) === 1100) {
      setHideButtonR({button: 'transparent', cursor: 'default'});
    }
    el.scrollBy(275, 0);
  }

  return (
    <div className='related-list'>
      <h3>Your Outfit:</h3>
      {outfit.length > 3 ?
        <button className='button-left' style={buttonLStyle} onClick={buttonL}>
          <FaAngleLeft/>
        </button> : null
      }
      <ul className='outfit-ul'>
        <div>
          <li className='add-to-outfit-button' onClick={handleClick}>
            <p>Add To Outfit</p>
          </li>
        </div>
        {outfit ? outfit.map(item =>
          <ProductCard setProduct={setProduct} key={item} item={item} list={'outfit'} outfit={outfit} setOutfit={setOutfit} />) : null
        }
      </ul>
      {outfit.length > 3 ?
        <button className='button-right' style={buttonRStyle} onClick={buttonR}>
          <FaAngleRight/>
        </button> : null
      }
    </div>
  )
}