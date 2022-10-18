import React from 'react';
import axios from 'axios';
import QA from './QA.jsx';
import ImageModal from './ImageModal.jsx';
import AddAnswModal from './AddAnswModal.jsx';
import {useState, useEffect} from 'react';


const QuesnAnsw = (props) => {
  // used to store questions data ---------------------------
  const [qaData, setQaData] = useState([]);
  // these states pass down the image url for the popup modal --------------
  const [getImage, setImage] = useState();
  const [modalOn, setModalOn] = useState(false);
  // popup modal for add new answers
  const [modalAnswOn, setModalAnswOn] = useState(false);
  // question/question id for add answers
  const [QID, setQID] = useState();


  // get questions --------------------
  useEffect(() => {
    if(props.product.id) {
      axios.get('/api/qa/questions', {params: {p_id: props.product.id} })
        .then((response) => {
          setQaData(response.data.results);
        })
        .catch(err => {
          console.log('Error fetching data: ', err);
        })
    }
  }, [props.product])


  return (
    <div>
      <div>
        <QA qaData={qaData} setImage={setImage} setModalOn={setModalOn} modalOn={modalOn} modalAnswOn={modalAnswOn} setModalAnswOn={setModalAnswOn} setQID={setQID} />
      </div>

      <div>
        <ImageModal getImage={getImage} modalOn={modalOn} setModalOn={setModalOn} />
      </div>

      <div>
        <AddAnswModal product={props.product} modalOn={modalOn} setModalOn={setModalOn} modalAnswOn={modalAnswOn} setModalAnswOn={setModalAnswOn} QID={QID} />
      </div>
    </div>
  )
}

export default QuesnAnsw;