import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

export default function RelatedItemsAndComparison({currentItem}) {

  return (
    <div>
      <RelatedProductsList currentItem={currentItem} />
      <YourOutfitList currentItem={currentItem} />
    </div>
  )
}