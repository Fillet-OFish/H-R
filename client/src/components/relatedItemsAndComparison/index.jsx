import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import { useTracker } from '../TrackClickContext.jsx';

export default function RelatedItemsAndComparison({currentItem, setProduct}) {
  const clickTracker = useTracker();
  return (
    <div onClick={(e)=>{clickTracker(e, 'Related Items & Outfit Creation')}}>
      <RelatedProductsList currentItem={currentItem} setProduct={setProduct} />
      <YourOutfitList currentItem={currentItem} setProduct={setProduct} />
    </div>
  )
}