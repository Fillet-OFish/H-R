import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'

export default function Cart({ style }) {
  const [skus, setSkus] = useState([])
  const [size, setSize] = useState('')
  const [OOS, setOOS] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [selectQnt, setSelectQnt] = useState(1)

  // on load/style change, let skus = array of style skus
  useEffect(() => {
    if(style.skus){
      setSkus(Object.values(style.skus))
    }
  }, [style])

  // input: n/a, output: sizes, dependent on the style/product
  function getSizes() {
    let arr = [<option key='default' value="default">SELECT SIZE</option>]
    skus.forEach((sku, i) => arr.push(<option key={i} value={sku.size}>{sku.size}</option>))
    return arr
  }

  // input: n/a, output: a varying # of <option> elements, dependent on sizing
  function getOptions() {
    let arr = []
    let num = 15
    if (quantity<15){num=quantity}
    for (let i=1; i<=num; i++) {
      arr.push(<option key={i} value={i.toString()}>{i.toString()}</option>)
    }
    return arr
  }

  // input: n/a, output: filter style.skus for the sku that matches the selected size before posting it to cart
  function postCart() {
    if(size===''||size==='default'){
      document.querySelector('.cart-warning').style.display = 'block'
    } else {
      document.querySelector('.cart-warning').style.display = 'none'
      let obj = style.skus
      let skuId = ''
      Object.keys(obj).forEach(key =>{
        if(JSON.stringify(Object.values(obj[key]['size'])) === JSON.stringify(size.split(''))) {
          skuId = key
        }
      })
      axios.post('/api/cart', {sku_id: skuId, count: selectQnt})
        .then(res => console.log('posted to cart!', res.data))
        .catch(e => console.log('erorr posting to cart', e))
    }
  }

  return(
    skus.length>0 && skus[0].quantity ?
      <div className="cart">
        {/* Hidden span, shows up if you try to add an item to cart with an invalid size */}
        <span className="cart-warning">Please select a size to continue</span>

        {/* Select size dropdown */}
        {skus ?
          <select className="select-size" onChange={e=>{
              setSize(e.target.value);
              skus.filter(sku => sku.size === e.target.value).map(sku => {
                setQuantity(sku.quantity);
                sku.quantity < 1 ? setOOS('OUT OF STOCK') : setOOS(null)
              })
            }}>
            {getSizes()}
          </select>
        :null}

        {/* select quantity dropdown */}
        <select className="select-qnt" onChange={e=>setSelectQnt(parseInt(e.target.value))}>
            {quantity&&size!=='default' ? getOptions() : <option value="0">-</option>}
        </select>

        {/* Add to cart */}
        {quantity===0 ?
          OOS
          :
          <button className="cart-btn" onClick={e=>postCart()}>Add to bag
            <span className="plus-sign"><FaPlus/></span>
          </button>
        }
      </div>
    : 'OUT OF STOCK'
  )
}