import React from 'react';
import QAEntry from './QAEntry.jsx';
import Pagination from './Pagination.jsx';
import {useState, useEffect} from 'react';
import AddQuesBtn from './AddQuesBtn.jsx';
import SearchQues from './SearchQues.jsx';
import LoadQuesBtn from './LoadQuesBtn.jsx';


const QA = (props) => {

  // PAGINATION WITH PAGE NUMBER (STATES) ----------------------------------------------
  // // User is currently on this page
  // const [currentPage, setCurrentPage] = useState(1);
  // // No of Records to be displayed on each page
  // const [recordsPerPage] = useState(4);

  // // you need indices of first and last records on current page
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // // Records to be displayed on the current page
  // const currentRecords = props.filter.slice(indexOfFirstRecord, indexOfLastRecord);
  // // calculate the number of pages
  // const nPages = Math.ceil(props.filter.length / recordsPerPage);
  // ----------------------------------------------------------------

  // PAGINATION WITH LOAD MORE (STATES) ----------------------------------------------
  // No of Records to be displayed on each page
  const [recordsPerPage, setRecordsPerPage] = useState(4);
  // Records to be displayed on the current page
  const currentRecords = props.filter.slice(0, recordsPerPage);

  // load more questions when click on button
  const loadQues = () => {
    setRecordsPerPage(recordsPerPage + 2);
  }
  // ----------------------------------------------------------------



  // iterate through questions data
  return (
    <div>
      <h3>Questions & Answers</h3>

      <div>
        {/* search bar ----------- */}
        <SearchQues searchFilter={props.searchFilter} />
      </div>

      <div className='QContainer'>
        {/* set each question entry --------- */}
        {currentRecords.map((ques, index) => (
          <QAEntry ques={ques} key={index} qaData={props.qaData} setImage={props.setImage} setModalOn={props.setModalOn} modalOn={props.modalOn} modalAnswOn={props.modalAnswOn} setModalAnswOn={props.setModalAnswOn} setQID={props.setQID} />
          ))}
      </div>

      <div className='align-btns'>
        <div>
          {/* set questions pagination ----------- */}
          {/* display 'load more answers' button depending on condition --------------- */}
          {(props.filter.length === currentRecords.length) ? "" : (props.filter.length > 4) ? <LoadQuesBtn loadQues={loadQues} /> : ""}
        </div>

        {/* <div>
          set pagination with page numbers -----------
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div> */}

        <div>
          {/* add question button ----------- */}
          <AddQuesBtn modalQuesOn={props.modalQuesOn} setModalQuesOn={props.setModalQuesOn}/>
        </div>
      </div>
    </div>
  )
}

export default QA;