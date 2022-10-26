import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breakdown from './components/Breakdown/Breakdown.jsx'
import ReviewsList from './components/ReviewsList/ReviewsList.jsx'
import AddRevModal from './components/ReviewsList/AddRevModal.jsx'
import ImageModal from './components/ReviewsList/ImageModal.jsx'

export default function Reviews(props) {
  const [reviews, setReviews] = useState(null)
  const [reviewsPage, setReviewsPage] = useState(1)
  const [reviewsMeta, setReviewsMeta] = useState(null)
  const [filter, setFilter] = useState([])

  // keep track of add review popup modal
  const [modalRevOn, setModalRevOn] = useState(false);
  // sort reviews by newest, helpful, relevant
  const [sort, setSort] = useState();
  // these states pass down the image url for the popup modal --------------
  const [getImage, setImage] = useState();
  const [modalOn, setModalOn] = useState(false);

  // console.log('reviews: ', reviews)
  console.log('reviewsMeta: ', reviewsMeta)
  console.log('rating: ', props.rating)
  // console.log('numReviews: ', props.numReviews)

  useEffect(() => {
    //reviews/:id/:page/:count/:sort
    console.log(sort, 'sorting')
    axios.get(`/api/reviews/${props.product.id}/${reviewsPage}/2/${sort}`)
      .then(result => {
        setReviews(result.data.results)
      })
      .catch(err=>console.log(err));
    axios.get(`/api/reviews/meta/${props.product.id}`)
      .then(result => {
        let data = result.data;
        let totalNum = Number(data.recommended.true) + Number(data.recommended.false);
        let rating = (Number(data.ratings[1]) + (Number(data.ratings[2]) * 2) + (Number(data.ratings[3]) * 3)+ (Number(data.ratings[4]) * 4) + (Number(data.ratings[5]) * 5)) / totalNum
        let roundedRating = Math.round(rating * 10) / 10;
        setReviewsMeta(data);
        props.setNumReviews(totalNum);
        props.setRating(roundedRating);
      })
      .catch(err => {console.log(err)})
  },[props.product, sort])


  return(
    reviews && reviewsMeta ?
    <div className="reviews-ratings">

      <h3>Ratings and Reviews</h3><br/>

      <div className='reviews-ratings-container'>
        <div className='review-left'>
          <Breakdown product={props.product} rating={props.rating} numReviews={props.numReviews} reviews={reviews} reviewsMeta={reviewsMeta} filter={filter} setFilter={setFilter}/>
        </div>
        <div className='review-right'>
          <ReviewsList product={props.product} reviews={reviews} reviewsPage={reviewsPage} setReviewsPage={setReviewsPage} setReviews={setReviews} modalRevOn={modalRevOn} setModalRevOn={setModalRevOn} />
        </div>
      </div>

      <div>
        {/* popup when clicking images in reviews ----------- */}
        <ImageModal getImage={getImage} modalOn={modalOn} setModalOn={setModalOn} />
      </div>

      <div className='reviews-buttons'>
        {/* add new questions ----------- */}
        <AddRevModal product={props.product} modalRevOn={modalRevOn} setModalRevOn={setModalRevOn} reviewsMeta={reviewsMeta}/>
      </div>

    </div>
    : null
  )
}