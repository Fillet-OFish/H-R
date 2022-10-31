import React from 'react';

export default function ReviewImgs(props) {
  return (
    <div>
      <img src={props.photo.url} className='rev-images' onClick={() => {
            props.setModalOn(!props.modalOn);
            props.setImage(props.photo.url);
          }}
      ></img>
    </div>
  )
}