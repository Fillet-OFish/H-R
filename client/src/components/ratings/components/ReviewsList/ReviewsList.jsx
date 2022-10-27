import React, { useState, useEffect, useRef } from 'react';
import ReviewTile from './ReviewTile.jsx'
import axios from 'axios';
import LoadRevBtn from './LoadRevBtn.jsx';
import AddRevBtn from './AddRevBtn.jsx';
import SortRev from './SortRev.jsx';


export default function ReviewsList(props) {

  // this is to help load more reviews -------------------------------
  const [load, setLoad] = useState(false);

  // update reviews page by 1
  const updateReviewPage = () => {
    props.setReviewsPage(props.reviewsPage + 1);
  }
  // load more reviews with product id, next page, and two reviews per
  const loadMoreReviews = () => {
    axios.get(`/api/reviews/${props.product.id}/${props.reviewsPage}/2/${props.sort}`)
    .then(result => {
      props.setReviews(props.reviews.concat(result.data.results))
      setLoad(!load);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    updateReviewPage();
    // scroll();
    // updateScroll();
  }, [load])

  // this is to auto scroll down on each review loaded ------------
  // const scroll = () => {
  //   document.querySelector('#revContainer').scrollIntoView({ behavior: 'smooth', block: 'end' });
  // };
  // function updateScroll() {
  //   var element = document.getElementById('revContainer');
  //   element.scrollTop = element.scrollHeight;
  // }
  // ----------------------------------------------------------------

  return (
    <div id='revContainer'>
      <SortRev sort={props.sort} setSort={props.setSort} numReviews={props.numReviews} />

      <div className='reviews-list-container'>
        {/* list every review entry --- */}
        {props.reviews.map((review, index) => (
          <ReviewTile review={review} key={index} index={index} lastIndex={props.reviews.length - 1} setImage={props.setImage} modalOn={props.modalOn} setModalOn={props.setModalOn} />
          ))}
      </div>

      <div className='align-btns'>
        <div>
          {/* button to load more reviews --- */}
          <LoadRevBtn loadMoreReviews={loadMoreReviews} />
        </div>
        <div>
          {/* add review button --- */}
          <AddRevBtn modalRevOn={props.modalRevOn} setModalRevOn={props.setModalRevOn} />
        </div>
      </div>
    </div>
  )
}