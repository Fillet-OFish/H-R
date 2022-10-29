import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDarkMode } from '../../contexts/DarkMode.jsx'

export default function Cart({ product }) {
  const [cart, setCart] = useState(null)
  const [updateCart, setUpdateCart] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const darkMode = useDarkMode();
  // on load/view-button click, sets cart
  useEffect(() => {
    axios.get('/api/cart')
      .then(res => setCart(res.data))
  },[updateCart])

  // leave hover function - closes cart when mouse leaves cart
  function closeCart() {
    document.querySelector('.cart-block').style.display = 'none';
  }

  return(
    <div className={`cart-block ${darkMode ? 'cart-block-dark' : null}`} onMouseLeave={() => closeCart()}>
      <h2>Your bag</h2>
          <hr/>
        <div>
          Subtotal:
          <p data-testid="cart-info">{showCart ? JSON.stringify(cart) : null}</p>
          <span className="cart-block-buttons">
            <button className="view-btn" data-testid="view-btn" onClick={()=>{setShowCart(!showCart);setUpdateCart(!updateCart)}}>
              VIEW BAG
            </button>
            <button className="checkout-btn">
              CHECKOUT
            </button>
          </span>
        </div>
    </div>
  )
}