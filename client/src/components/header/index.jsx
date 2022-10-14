import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search.jsx'
import Cart from './components/Cart.jsx'
import {FaShoppingBag} from 'react-icons/fa';

export default function Header({product}) {

  function showCart() {
    document.getElementsByClassName('cart-block')[0].style.display = 'block';
  }

  function closeCart() {
    document.getElementsByClassName('cart-block')[0].style.display = 'none';
  }

  return(
    <>
      <div className="header">
        Logo <Search/>
      <span className="shopping-bag" onMouseEnter={() => showCart()} onMouseLeave={() => closeCart()}>
        <FaShoppingBag className="shopping-bag-icon"/>
        </span>
      </div>

      <Cart />
    </>
  )
}