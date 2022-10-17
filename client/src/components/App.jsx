import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuesnAnsw from './qa/index.jsx';
import QA from './qa/QA.jsx';

export default function App() {
  const [products, setProducts] = useState([]) // list of all products (needed for search bar)
  const [product, setProduct] = useState([]) // one product (needed for page render)
  const [update, setUpdate] = useState(false)

  // used to store questions data ---------------------------
  const [qaData, setQaData] = useState([]);


  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(4);

  // you need indices of first and last records on current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  const currentRecords = qaData.slice(indexOfFirstRecord, indexOfLastRecord);
  // calculate the number of pages
  const nPages = Math.ceil(qaData.length / recordsPerPage);


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
      .catch(err => {
        console.log('Error fetching data: ', err);
      })
  }, [product])

  console.log(qaData, 'IM QUEST DATA ---------')

  return (
    <div>
      hello world
      <button onClick={() => temp()}>click</button>

      <QuesnAnsw qaData={qaData} currentRecords={currentRecords} nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}