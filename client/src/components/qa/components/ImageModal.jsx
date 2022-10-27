import React from 'react';


// ENTRY OF EACH ANSWER ----------
const ImageModal = (props) => (

    <div className={(props.modalOn === true) ? 'popup-img' : ''} onClick={() => {
      props.setModalOn(!props.modalOn);
      // props.setImage(img.url);
    }}>
      {props.modalOn === true ?
        <div className='form-popup'>
          <img src={props.getImage} className='img-modal'></img>
        </div> :
        ""}
    </div>
)

export default ImageModal;