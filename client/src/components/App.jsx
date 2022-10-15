import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuesnAnsw from './qa/index.jsx';
import QA from './qa/QA.jsx';

export default function App() {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [product, setProduct] = useState([]) // one product (needed for page render)
  const [update, setUpdate] = useState(false)

  const [qaData, setQaData] = useState([]); // used to store question data

  function temp() {
    axios.get('/api/products')
      .then(data => console.log('frontend', data.data))
  }


  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
    axios.get(`/api/products/${40344}`) // id 40344
      .then(result => setProduct(result.data))
  },[update])

  // get questions --------------------
  useEffect(() => {
    axios.get('/api/qa/questions', {params: {p_id: product.id} })
      .then((response) => {
        setQaData(response.data.results);
      })
  }, [product])

  console.log(qaData, 'IM QUEST DATA ---------')

  return (
    <div>
      hello world
      <button onClick={() => temp()}>click</button>

      <QuesnAnsw qaData={qaData} />
    </div>
  )
}