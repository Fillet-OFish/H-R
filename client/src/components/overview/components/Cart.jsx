import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'

export default function Cart({ style }) {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [skus, setSkus] = useState([])
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [selectQnt, setSelectQnt] = useState(1)

  useEffect(() => {
    if(style.skus){setSkus(Object.values(style.skus))}
  }, [style])

  function getOptions() {
    let arr = []
    let num = 15
    if (quantity<15){num=quantity}
    for (let i=1; i<=num; i++) {
      arr.push(<option key={i} value={i.toString()}>{i.toString()}</option>)
    }
    return arr
  }

  function postCart(prop) {
    let obj = style.skus
    let skuId = ''
    Object.keys(obj).forEach(key =>{
      if(JSON.stringify(Object.values(obj[key]['size'])) === JSON.stringify(size.split(''))) {
        skuId = key
      }
    })
    axios.post('/api/cart', {sku_id: skuId, count: selectQnt})
      .then(res => console.log('posted!', res.data))
  }

  return(
    <div className="cart">
      {/* select size dropdown */}
      <select className="select-size" onChange={e=>{
          setSize(e.target.value);
          if(skus){
            console.log('checker', skus)
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
          {quantity&&size!=='default' ? getOptions() : <option>QUANTITY</option>}
      </select>

      {/* add to cart */}
      {quantity>0 ?
        <p>
          <button className="cart-btn">Add to bag
          <span className="plus-sign"><FaPlus onClick={e=>postCart()}/></span>
          </button>
        </p>
        : null}

        {/* <button onClick={e=>getCart()}>cart</button> */}
    </div>
  )
}