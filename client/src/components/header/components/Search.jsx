import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'


export default function Search({product}) {

  return(
    <>
    <form className='search-bar'>
      <input placeholder="SEARCH"/>
      <button><FaSearch/></button>
    </form>
    </>
  )
}