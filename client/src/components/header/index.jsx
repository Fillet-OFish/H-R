import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search.jsx'
import Cart from './components/Cart.jsx'
import { FaShoppingBag } from 'react-icons/fa';

export default function Header({ product }) {

  // on hover function - shows cart when hovering over shopping bag
  function showCart() {
    document.getElementsByClassName('cart-block')[0].style.display = 'block';
  }

  return(
    <>
      <div className='announcement'>
        <p>New windproof fleeces. <a href='/'>SHOP WOMEN</a> - <a href='/'>SHOP MEN</a></p>
      </div>

      <div className='header'>
        {/* logo */}
        <span className='logo'><a href='/'>Hack & Reactor</a></span> <Search/>

        {/* sign in/register */}
        <span className='header-links'>
          <span className='header-link'>SIGN IN/REGISTER</span>
          <span className='header-link'>WISHLIST</span>
        </span>

        {/* cart */}
        <span className='shopping-bag' onMouseEnter={() => showCart()}>
          <FaShoppingBag className='shopping-bag-icon'/>
        </span>

        {/* categories */}
        <p className='categories'>
          <span className='category'><a href='/'>Women</a></span>
          <span className='category'><a href='/'>Men</a></span>
          <span className='category'><a href='/'>Accessories</a></span>
        </p>
      </div>

      {/* add to cart */}
      <Cart />
    </>
  )
}