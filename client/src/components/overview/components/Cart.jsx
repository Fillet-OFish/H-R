import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'

export default function Cart({ style }) {
  const [products, setProducts] = useState([])
  const [skus, setSkus] = useState([])
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [selectQnt, setSelectQnt] = useState(1)

  // on load/style change, let skus = array of style skus
  useEffect(() => {
    if(style.skus){setSkus(Object.values(style.skus))}
  }, [style])

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
    let obj = style.skus
    let skuId = ''
    Object.keys(obj).forEach(key =>{
      if(JSON.stringify(Object.values(obj[key]['size'])) === JSON.stringify(size.split(''))) {
        skuId = key
      }
    })
    axios.post('/api/cart', {sku_id: skuId, count: selectQnt})
      .then(res => console.log('posted to cart!', res.data))
  }


  return(
    <div className="cart">
      {/* select size dropdown */}
      <select className="select-size" onChange={e=>{
          setSize(e.target.value);
          if(skus){
            skus.filter(sku => sku.size === e.target.value).map(sku => setQuantity(sku.quantity))
          };
        }}>
        <option value="default">SELECT SIZE</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      {/* select quantity dropdown */}
      <select className="select-qnt" onChange={e=>setSelectQnt(parseInt(e.target.value))}>
          {quantity&&size!=='default' ? getOptions() : <option value="0">QUANTITY</option>}
      </select>

      {/* add to cart */}
      {quantity!==0 && size!=='default'?
        <p>
          <button className="cart-btn" onClick={e=>postCart()}>Add to bag
          <span className="plus-sign"><FaPlus/></span>
          </button>
        </p>
        : null}
    </div>
  )
}