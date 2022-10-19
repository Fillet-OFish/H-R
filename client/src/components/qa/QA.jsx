import React from 'react';
import QAEntry from './QAEntry.jsx';
import Pagination from './Pagination.jsx';
import {useState, useEffect} from 'react';
import AddQuesBtn from './AddQuesBtn.jsx';
import SearchQues from './SearchQues.jsx';


const QA = (props) => {

  // PAGINATION STATES ----------------------------------------------
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(4);

  // you need indices of first and last records on current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  const currentRecords = props.filter.slice(indexOfFirstRecord, indexOfLastRecord);
  // calculate the number of pages
  const nPages = Math.ceil(props.filter.length / recordsPerPage);
  // ----------------------------------------------------------------



  // iterate through questions data
  return (
    <div>
      <hr className='hr3'></hr>
      <h2>Questions & Answers</h2>

      <div>
        {/* search bar ----------- */}
        <SearchQues searchFilter={props.searchFilter} />
      </div>

      <div className='QContainer'>
        {currentRecords.map((ques, index) => (
          // set each question entry ---------
          <QAEntry ques={ques} key={index} qaData={props.qaData} setImage={props.setImage} setModalOn={props.setModalOn} modalOn={props.modalOn} modalAnswOn={props.modalAnswOn} setModalAnswOn={props.setModalAnswOn} setQID={props.setQID} />
          ))}
      </div>

      <div>
        {/* set pagination ----------- */}
        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>

      <div>
        {/* add question button ----------- */}
        <AddQuesBtn modalQuesOn={props.modalQuesOn} setModalQuesOn={props.setModalQuesOn}/>
      </div>
      <hr className='hr3'></hr>
    </div>
  )
}

export default QA;