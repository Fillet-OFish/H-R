import React from 'react';
import { FaSearch } from 'react-icons/fa'
import { useDarkMode } from '../../DarkMode.jsx'


export default function Search({ product }) {
  const darkMode = useDarkMode()

  function closeCart() {
    document.querySelector('.search-block').style.display = 'none';
  }

  return(
    <div className="search-block">
    <form className={`search-bar ${darkMode ? 'search-bar-dark' : null}`}>
      <button  style={darkMode ? {color: 'white'} : {} }><FaSearch/></button>
      <input style={darkMode ? {color: 'white', borderBottom: '1.5px white solid'} : {} } placeholder="SEARCH"/>
    </form>
    </div>
  )
}