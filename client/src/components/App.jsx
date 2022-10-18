import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuesnAnsw from './qa/index.jsx';
import Header from './header/index.jsx'
import Overview from './overview/index.jsx';
import Description from './description/index.jsx';
import RelatedItemsAndComparison from './relatedItemsAndComparison/RelatedItemsAndComparison.jsx'

export default function App() {
  const [products, setProducts] = useState([]); // list of all products (needed for search bar)
  const [product, setProduct] = useState([]); // one product (needed for page render)
  const [update, setUpdate] = useState(false);
  const [productRating, setProductRating] = useState([]); //set current product's rating

  // used to store questions data ---------------------------
  const [qaData, setQaData] = useState([]);


  useEffect(() => {
    axios.get('/api/products')
      .then(result => {setProducts(result.data)})
    axios.get(`/api/products/${40344}`) // id 40344
    .then(result => setProduct(result.data))

    if(product.id){
      axios.get(`/api/reviews/${product.id}`)
      .then((data) => {
        let rating = {};
        rating.count = data.data.count;
        let average = 0
        for (var i = 0; i < data.data.results.length; i++) {
          average += data.data.results[i].rating
          if (i === data.data.results.length - 1) {
            average = average / data.data.results.length
          }
        }
        rating.average = average;
        setProductRating(rating);
      })
    }
  },[update])

  // get questions --------------------
  useEffect(() => {
    if(product.id){
      axios.get('/api/qa/questions', {params: {p_id: product.id} })
      .then((response) => {
        setQaData(response.data.results);
      })
      .catch(err => {
        console.log('Error fetching data: ', err);
      })
    }
  }, [product])

  return(<>
    {/* header */}
    <Header product={product}/>

    {/* overview */}
    <div className="container">
      <Overview product={product} rating={productRating}/>
    </div>

    {/* description */}
    <Description product={product}/>

    {/* related products */}
    <div className="container">
      {product.id ? <RelatedItemsAndComparison currentItem={product} setProduct={setProduct} /> : null }
    </div>

    {/* Questions and Answers */}
    <div className="container">
      <QuesnAnsw qaData={qaData} />
    </div>
  </>)
}