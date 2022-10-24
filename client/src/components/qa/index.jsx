import React from 'react';
import axios from 'axios';
import QA from './components/QA.jsx';
import ImageModal from './components/ImageModal.jsx';
import AddAnswModal from './components/AddAnswModal.jsx';
import AddQuesModal from './components/AddQuesModal.jsx';
import {useState, useEffect} from 'react';


const QuesnAnsw = (props) => {
  // used to store questions data ---------------------------
  const [qaData, setQaData] = useState([]);
  // filter data on search bar
  const [filter, setFilter] = useState(qaData);

  // these states pass down the image url for the popup modal --------------
  const [getImage, setImage] = useState();
  const [modalOn, setModalOn] = useState(false);
  // popup modal for add new answers
  const [modalAnswOn, setModalAnswOn] = useState(false);
  // question/question id for add answers
  const [QID, setQID] = useState();

  // keep track of add question popup modal
  const [modalQuesOn, setModalQuesOn] = useState(false);


  // get questions --------------------
  useEffect(() => {
    if(props.product.id) {
      axios.get('/api/qa/questions', {params: {p_id: props.product.id} })
        .then((response) => {
          setQaData(response.data.results);
          setFilter(response.data.results);
        })
        .catch(err => {
          console.log('Error fetching data: ', err);
        })
    }
  }, [props.product])

  // search filter results
  const searchFilter = (letters) => {
    // if input letters is an empty array, keep showing full data
    if (Array.isArray(letters)) {
      setFilter(qaData);
    } else { // if input letters isnt an array and letters is greater than 2
      let filtered = [];
      // iterate thorugh qaData
      qaData.forEach((current, index, collection) => {
        if (current.question_body.toLowerCase().includes(letters.toLowerCase())) {
          filtered.push(current);
        }
      })
      // if no search result found
      if (filtered.length === 0) {
        filtered.push({question_body: 'No questions found... Add a new question!'})
      }
      // set filter data to filtered array
      setFilter(filtered);
    }
  }


  return (
    <div className="q-a">
      <div>
        {/* rendering QA ----------- */}
        <QA filter={filter} searchFilter={searchFilter} setImage={setImage} setModalOn={setModalOn} modalOn={modalOn} modalAnswOn={modalAnswOn} setModalAnswOn={setModalAnswOn} setQID={setQID} modalQuesOn={modalQuesOn} setModalQuesOn={setModalQuesOn} />
      </div>

      <div>
        {/* popup when clicking images in answers ----------- */}
        <ImageModal getImage={getImage} modalOn={modalOn} setModalOn={setModalOn} />
      </div>

      <div>
        {/* add new questions ----------- */}
        <AddQuesModal product={props.product} modalQuesOn={modalQuesOn} setModalQuesOn={setModalQuesOn} />
      </div>

      <div>
        {/* add new answers ----------- */}
        <AddAnswModal product={props.product} modalAnswOn={modalAnswOn} setModalAnswOn={setModalAnswOn} QID={QID} />
      </div>
    </div>
  )
}

export default QuesnAnsw;