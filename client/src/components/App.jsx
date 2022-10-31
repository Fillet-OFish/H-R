import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DarkModeProvider } from './contexts/DarkMode.jsx';
import { TrackProvider } from './contexts/TrackClickContext.jsx';
import Announcements from './header/components/Announcements.jsx'
import Header from './header/index.jsx'
import Overview from './overview/index.jsx';
import Description from './overview/components/Description.jsx';
import RelatedItemsAndComparison from './related-items/index.jsx';
import QuesnAnsw from './qa/index.jsx';
import Ratings from './ratings/index.jsx';
import Footer from './footer/index.jsx';


export default function App() {
  const [product, setProduct] = useState([]);
  const [toggleQnA, setToggleQnA] = useState(false)
  const [rating, setRating] = useState([]);
  const [numReviews, setNumReviews] = useState(0);


  useEffect(() => {
    axios.get('/api/products/40344') // id 40344
      .then(result => setProduct(result.data))
      .catch(e => console.log('product setting error', e))
  },[])

  function toggledQnA(){
    if(!toggleQnA){
      document.querySelector('.reviews-ratings').style.display = 'none'
      document.querySelector('.q-a').style.display = 'block'
    } else {
      document.querySelector('.q-a').style.display = 'none'
      document.querySelector('.reviews-ratings').style.display = 'block'
    }
    document.querySelector('.toggled').style.transition = 'font 0.3s ease'
  }


  return(
    product.id ?
    <TrackProvider>
      <DarkModeProvider>

        <Announcements/>

        <div className='app-body'>

          {/* header */}
          <Header product={product}/>

          {/* overview */}
          <div className="overview">
            <Overview product={product} rating={rating} numReviews={numReviews}/>
          </div>

          <div className="contain-description-related">
            {/* description */}
            <Description product={product}/>

            {/* related products */}
            <RelatedItemsAndComparison currentItem={product} setProduct={setProduct} />
          </div>
        </div>

        {/* where you'll scroll to when you click reviews from overview */}
        <div className="gallery-scroll-to-here">
          <br/>
        </div>

        {/* toggles QnA or reviews */}
        <div className="toggle-btns">
          <button className={!toggleQnA? "toggled" : "reviewsToToggle"} onClick={e=>{ if(toggleQnA){setToggleQnA(!toggleQnA); toggledQnA()}}}>
              Reviews
          </button>
          <button className={toggleQnA? "toggled" : "qnaToToggle"} onClick={e=>{ if(!toggleQnA){setToggleQnA(!toggleQnA); toggledQnA()}}}>
              Questions
          </button>
        </div>

        <div className="contain-reviews-QnA">
          {/* Questions and Answers */}
          <QuesnAnsw product={product} />

          {/* Reviews */}
          <Ratings product={product} rating={rating} setRating={setRating} numReviews={numReviews} setNumReviews={setNumReviews}/>
        </div>


        <Footer product={product}/>

      </DarkModeProvider>
    </TrackProvider>
    : null
  )
}
