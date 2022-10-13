import React from 'react';
import axios from 'axios';
import RelatedItemsAndComparison from './relatedItemsAndComparison/RelatedItemsAndComparison.jsx'

export default function App() {

  function temp() {
    axios.get('/api/products')
      .then(data => console.log('frontend', data))
  }

  return(
    <div>
      hello world
      <button onClick={() => temp()}>click</button>
      <RelatedItemsAndComparison {/*currentItem={currentItem}*/}/>
    </div>
  )
}