import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatings from '../../../helper/StarRatings.jsx';
import PopupComparison from './PopupComparison.jsx';
import ProductCardImage from './ProductCardImage.jsx';
import { useDarkMode } from '../../../contexts/DarkMode.jsx'


export default function ProductCard({currentItem, item, setProduct, list, outfit, setOutfit}) {

  const [relatedItem, setrelatedItem] = useState(null);
  const [styles, setStyles] = useState(null);
  const [defaultStyle, setDefaultStyle] = useState(null);
  const [popup, setPopup] = useState(false);
  const [hover, setHover] = useState(false);
  const darkMode = useDarkMode();

  useEffect(() => {
    const source = axios.CancelToken.source();
    if(item){
      axios.get(`/api/products/${item}`, {cancelToken: source.token})
        .then(data => setrelatedItem(data.data))
        .catch(err => console.log(err));
      axios.get(`/api/products/${item}/styles`, {cancelToken: source.token})
        .then(data => {
          setStyles(data.data);
          for (var i = 0; i < data.data.results.length; i++) {
            if (data.data.results[i]['default?']) {
              setDefaultStyle(data.data.results[i]);
              return;
            }
            if (i === data.data.results.length - 1) {
              setDefaultStyle(data.data.results[0]);
            }
          }
        })
        .catch((err) => {console.log(err)});
        return () => source.cancel();
    }
  }, [currentItem])


  const clickHandler = (e) => {
    if (e.target.className === 'product-card-button') {return};
    if (e.target.className === 'preview-image') {return};
    if (e.target.tagName === 'svg') {return};
    if (e.target.tagName === 'path') {return};
    if (e.target.className === 'button-left') {return};
    if (e.target.className === 'button-right') {return};
    setProduct(relatedItem);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleComparisonClick = () => {
    setPopup(!popup);
  }

  const handleOutfitClick = () => {
    const i = outfit.indexOf(item);
    const newOutfit = outfit.slice(0, i).concat(outfit.slice(i + 1));
    localStorage.setItem('outfit', JSON.stringify(newOutfit));
    setOutfit(newOutfit);
  }

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {popup ?
        <PopupComparison currentItem={currentItem} relatedItem={relatedItem} setHover={setHover} setPopup={setPopup}/> : null
      }
      {relatedItem && defaultStyle && styles ?
        <li className={`product-card ${darkMode ? 'product-card-dark' : null}`} onClick={e => {clickHandler(e);}} >
          <ProductCardImage defaultStyle={defaultStyle} styles={styles}/>
          {list === 'related' && hover ?
            <button className='product-card-button' onClick={e => {handleComparisonClick();}}>
              ☆
            </button> : null
          }
          {list === 'outfit' && hover ?
            <button className='product-card-button' onClick={e => {handleOutfitClick;}}>
              x
            </button> : null
          }
          <div className='product-card-info'>
            <small>{relatedItem.category}</small>
            <div className='product-card-name'>{relatedItem.name}</div>
            {defaultStyle.sale_price ?
              <div>
                <p style={{color: 'red'}}>${defaultStyle.sale_price}</p>
                <small style={{textDecoration: 'line-through'}}>${defaultSTyle.original_price}</small>
              </div>
              :
              <small>${defaultStyle.original_price}</small>
            }
            <div><StarRatings item={item} /></div>
          </div>
        </li> : null
      }
    </div>
  )
}
