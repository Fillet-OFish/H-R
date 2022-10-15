import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cart({product}) {
  const [cart, setCart] = useState(null)
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    axios.get('/api/cart')
      .then(res => setCart(res.data))
  },[product])

  function closeCart() {
    document.getElementsByClassName('cart-block')[0].style.display = 'none';
  }

  return(
    <div className="cart-block" onMouseLeave={() => closeCart()}>
      <h2>Your bag</h2>
          <hr/>
        <p>
          Subtotal:
          <span className="cart-block-buttons"><button className="view-btn" onClick={()=>setShowCart(!showCart)}>VIEW BAG</button> <button className="checkout-btn">CHECKOUT</button></span>
        </p>
        <p>{showCart ? JSON.stringify(cart) : null}</p>
    </div>
  )
}