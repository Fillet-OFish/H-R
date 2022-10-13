import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QA from './QA.jsx';
import {useState, useEffect} from 'react';

export default function App() {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [product, setProduct] = useState([]) // one product (needed for page render)
  const [update, setUpdate] = useState(false)

  function temp() {
    axios.get('/api/products')
      .then((data) => {
        console.log('frontend', data.data);
        axios.get(`/api/qa/questions?product_id=${data.data.id}`)
          .then((response) => console.log(response.data));
      })
  }
  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
    axios.get(`/api/products/${40344}`) // id 40344
      .then(result => setProduct(result.data))
  },[update])


  return (
    <div>
      hello world
      <button onClick={() => temp()}>click</button>

      <div>
        <QA />
      </div>

    </div>
  )
}