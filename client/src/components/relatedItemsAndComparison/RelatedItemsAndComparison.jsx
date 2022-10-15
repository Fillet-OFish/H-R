import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

export default function RelatedItemsAndComparison({currentItem, setProduct}) {


  return (
    <div className="related-items">
      <RelatedProductsList currentItem={currentItem} setProduct={setProduct} />
      <YourOutfitList currentItem={currentItem} setProduct={setProduct} />
    </div>
  )
}