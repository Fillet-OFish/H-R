import React from 'react';


const LoadRevBtn = (props) => (
  <div>
    <button className='form-button3' onClick={() => {
      props.updateReviewPage();
      props.loadMoreReviews();
    }}>Load More Reviews</button>
  </div>
)

export default LoadRevBtn;