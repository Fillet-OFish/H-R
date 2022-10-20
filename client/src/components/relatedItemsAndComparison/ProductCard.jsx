import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatings from './StarRatings.jsx';
import PopupComparison from './PopupComparison.jsx';
import ProductCardImage from './ProductCardImage.jsx';
import { useTracker } from '../TrackClickContext.jsx';

export default function ProductCard({currentItem, item, setProduct, list, outfit, setOutfit}) {

  const [relatedItem, setrelatedItem] = useState(null);
  const [styles, setStyles] = useState(null);
  const [defaultStyle, setDefaultStyle] = useState(null);
  const [popup, setPopup] = useState(false);
  const clickTracker = useTracker();

  useEffect(() => {
    const source = axios.CancelToken.source();

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
  }, [])

  const clickHandler = (e) => {
    if (e.target.className === 'product-card-button') {return};
    if (e.target.className === 'preview-image') {return};
    if (e.target.tagName === 'svg') {return};
    if (e.target.tagName === 'path') {return};
    if (e.target.className === 'button-left') {return};
    if (e.target.className === 'button-right') {return};
    setProduct(relatedItem);
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
    <div>
      {popup ?
        <PopupComparison currentItem={currentItem} relatedItem={relatedItem} setPopup={setPopup}/> : null
      }
      {relatedItem && defaultStyle && styles ?
        <li className='product-card' onClick={e => {clickHandler(e); clickTracker(e, 'Related Items & Outfit Creation')}} >
          <ProductCardImage defaultStyle={defaultStyle} styles={styles}/>
          {list === 'related' ?
            <button className='product-card-button' onClick={e => {handleComparisonClick(); clickTracker(e, 'Related Items & Outfit Creation')}}>
              ☆
            </button> : null
          }
          {list === 'outfit' ?
            <button className='product-card-button' onClick={e => {handleOutfitClick; clickTracker(e, 'Related Items & Outfit Creation')}}>
              x
            </button> : null
          }
          <div className='product-card-info'>
            <small>{relatedItem.category}</small>
            <div className='product-card-name'>
              {relatedItem.name + ' - ' + relatedItem.slogan}
            </div>
            {defaultStyle.sale_price ?
              <div>
                <p style={{color: 'red'}}>
                  ${defaultStyle.sale_price}
                </p>
                <small style={smallStyle, {textDecoration: 'line-through'}}>
                  ${defaultSTyle.original_price}
                </small>
              </div>
              :
              <small>
                ${defaultStyle.original_price}
              </small>
            }
            <StarRatings item={item} />
          </div>
        </li> : null
      }
    </div>
  )
}
