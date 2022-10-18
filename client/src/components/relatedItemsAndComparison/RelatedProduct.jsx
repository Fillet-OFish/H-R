import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import StarRatings from './StarRatings.jsx'
import PopupComparison from './PopupComparison.jsx'


const style = {
  listStyleType: 'none',
  position: 'relative',
  border: '1px solid lightgrey ',
  margin: '8px',
  // overflow: 'hidden',
  width: '257px',
  height: '380px',
  cursor: 'pointer',
  borderRadius: '6px'
}

const imageStyle = {
  width: '100%',
  height: '70%',
  objectFit: 'cover'
}

const smallStyle = {
  color: 'grey',
  margin: '10px 0 10px 0'
}


export default function RelatedProduct({item, setProduct, list, outfit, setOutfit}) {

  const [currentItem, setCurrentItem] = useState([]);
  const [defaultStyle, setDefaultStyle] = useState([]);
  const [hover, setHover] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get(`/api/products/${item}`, {cancelToken: source.token})
    .then((data) => {setCurrentItem(data.data)})
    .catch((err) => {console.log(err)});

    axios.get(`/api/products/${item}/styles`, {cancelToken: source.token})
    .then((data) => {
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

  const buttonStyle = {
    position: 'absolute',
    top: '3%',
    left: '90%',
    WebkitTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)',
    backgroundColor: (hover ? 'white' : 'rgba(0, 0, 0, .2)'),
    color: (hover ? 'grey' : 'white'),
    fontSize: '22px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px'

  }

  const clickHandler = function (e) {
    e.preventDefault();
    if(!hover) {
      setProduct(currentItem);
    }
  }

  const handleOutfitClick = (e) => {
    e.preventDefault();
    const i = outfit.indexOf(item);
    const newOutfit = outfit.slice(0, i).concat(outfit.slice(i + 1));
    localStorage.setItem('outfit', JSON.stringify(newOutfit));
    setOutfit(newOutfit);
  }


  const handleComparisonClick = (e) => {
    e.preventDefault();
    setPopup(!popup);
  }

  return (
    <div>
      <PopupComparison popup={popup} setPopup={setPopup}/>
      {currentItem && defaultStyle.photos ?
        <li style={style} onClick={(e) => {clickHandler(e)}} >
          <img style={imageStyle} src={defaultStyle.photos[0].thumbnail_url || 'https://i.postimg.cc/gjFHrzW3/image-4.png'}></img>

          {list === 'related' ?
            <button onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} style={buttonStyle} onClick={e=>{handleComparisonClick(e)}}>
              ☆
            </button> : null
          }

          {list === 'outfit' ?
            <button onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} style={buttonStyle} onClick={e=>{handleOutfitClick(e)}}>
              x
            </button> : null
          }

          <div style={{padding: '5px 10px 0 10px' }}>
            <small style={smallStyle}>{currentItem.category}</small>
            <div style={{height: '30px', padding: '3px 0 3px 0', fontSize: '13px'}}>{currentItem.name + ' - ' + currentItem.slogan}</div>
            <div>{defaultStyle.sale_price ?
              <div>
                <p style={{color: 'red'}}>${defaultStyle.sale_price}</p>
                <small style={smallStyle, {textDecoration: 'line-through'}}>${defaultSTyle.original_price}</small>
              </div>
              : <small style={smallStyle}>${defaultStyle.original_price}</small>}</div>
            <StarRatings item={item} />
          </div>
        </li>
        : null
      }
    </div>
  )
}
