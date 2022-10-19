import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export default function RelatedProductsList ({currentItem, setProduct}) {
  const [relatedItems, setRelatedItems] = useState([])
  const [hideButtonL, setHideButtonL] = useState({button: 'transparent', cursor: 'default'});
  const [hideButtonR, setHideButtonR] = useState({button: 'grey', cursor: 'pointer'});

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`/api/products/${currentItem.id}/related`, {cancelToken: source.token})
    .then(data => {setRelatedItems(data.data)})
    .catch(err => console.log(err));
  }, [currentItem])

  const buttonLStyle = {
    color: hideButtonL.button,
    cursor: hideButtonL.cursor
  }

  const buttonRStyle = {
    color: hideButtonR.button,
    cursor: hideButtonR.cursor
  }

  const buttonL = () => {
    const el = document.querySelector('.related-list .related-ul');
    if (el.scrollWidth - (el.scrollLeft - 275) > 1100) {
      setHideButtonR({button: 'grey', cursor: 'pointer'});
    }
    if (el.scrollLeft - 275 === 0) {
      setHideButtonL({button: 'transparent', cursor: 'default'});
    }
    el.scrollBy(-275, 0);
  }

  const buttonR = () => {
    const el = document.querySelector('.related-list .related-ul');
    setHideButtonL({button: 'grey', cursor: 'pointer'});
    if (el.scrollWidth - (el.scrollLeft + 275) === 1100) {
      setHideButtonR({button: 'transparent', cursor: 'default'});
    }
    el.scrollBy(275, 0);
  }

  return (
    <div className='related-list'>
      <h3>Related Products:</h3>
      {relatedItems.length > 4 ?
        <button className='button-left' style={buttonLStyle} onClick={buttonL}>
          <FaAngleLeft/>
        </button> : null
      }
      <ul className='related-ul'>
        {relatedItems.map(item => (
          <ProductCard currentItem={currentItem} setProduct={setProduct} key={item} item={item} list={'related'}/>
          ))
        }
      </ul>
      {relatedItems.length > 4 ?
        <button className='button-right' style={buttonRStyle} onClick={buttonR}>
          <FaAngleRight/>
        </button> : null
      }
    </div>
  )
}