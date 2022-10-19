import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

export default function RelatedItemsAndComparison({currentItem, setProduct}) {
  return (
    <div>
      <RelatedProductsList currentItem={currentItem} setProduct={setProduct} />
      <YourOutfitList currentItem={currentItem} setProduct={setProduct} />
    </div>
  )
}