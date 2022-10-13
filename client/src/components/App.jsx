import React from 'react';
import axios from 'axios';
import QA from './QA.jsx';
import {useState, useEffect} from 'react';

export default function App() {

  const [quesData, setQuestData] = useState([]);

  function temp() {
    axios.get('/api/products')
      .then((data) => {
        console.log('frontend', data.data);
        axios.get(`/api/qa/questions?product_id=${data.data.id}`)
          .then((response) => console.log(response.data));
      })
  }


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