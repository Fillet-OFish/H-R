import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Announcements from './components/Announcements.jsx'
import Search from './components/Search.jsx'
import Cart from './components/Cart.jsx'
import { FaSearch, FaShoppingBag } from 'react-icons/fa';
import { useDarkMode } from '../DarkMode.jsx'

export default function Header({ product }) {
  const darkMode = useDarkMode();

  // on hover function - shows cart when hovering over shopping bag
  function showCart() {
    document.querySelector('.cart-block').style.display = 'block';
  }

  function showSearch() {
    document.querySelector('.search-block').style.display = 'block';
  }

  return(
    <>
      {/* announcements */}
      <Announcements/>

      <div className={`header ${darkMode ? 'header-dark' : null}`}>

        <div className="header-col-1">
          {/* logo */}
          <span className='logo'><a style={darkMode ? {color: 'white'} : {}} href='/'>Hack & Reactor</a></span>
        </div>

        <div className="header-col-3">
          {/* search */}
            <FaSearch className="search-bar-icon"/>

          {/* sign in/register */}
            <span className='header-links'>
              <span className='header-link'>SIGN IN/REGISTER</span>
              <span className='header-link'>WISHLIST</span>
            </span>

          {/* cart */}
          <span className='shopping-bag' onMouseEnter={() => showCart()}>
            <FaShoppingBag className='shopping-bag-icon'/>
          </span>
        </div>

      </div>

       {/* categories */}
      <div className='categories'>
        <span className='category'><a style={darkMode ? {color: 'white'} : {}} href='/'>Women</a></span>
        <span className='category'><a style={darkMode ? {color: 'white'} : {}} href='/'>Men</a></span>
        <span className='category'><a style={darkMode ? {color: 'white'} : {}} href='/'>Accessories</a></span>
      </div>

      {/* add to cart */}
      <Cart />
    </>
  )
}