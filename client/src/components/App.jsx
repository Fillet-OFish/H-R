import React from 'react';
import axios from 'axios';

export default function App() {

  function temp() {
    axios.get('/api/products')
      .then(data => console.log('frontend', data.data))
  }

  return(
    <div>
      hello world
      <button onClick={() => temp()}>click</button>
    </div>
  )
}