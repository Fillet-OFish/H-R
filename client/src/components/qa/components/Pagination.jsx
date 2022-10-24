import React from 'react';

// Pagination ----------
const Pagination = (props) => {
  // create an array that holds all the page numbers from 1 to nPages
  const totalPages = [...Array(props.nPages + 1).keys()].slice(1);

  // prev and next pages ---
  const nextPage = () => {
    if(props.currentPage !== props.nPages)
        props.setCurrentPage(props.currentPage + 1)
  }
  const prevPage = () => {
      if(props.currentPage !== 1)
          props.setCurrentPage(props.currentPage - 1)
  }

  return (
    <nav>
      <div className='pagination'>
        <a className="pagination" onClick={prevPage} href='#'> Previous </a>
      </div>
      {totalPages.map(pgNumber => (
        <div key={pgNumber} className='pagination'>
          <a onClick={() => props.setCurrentPage(pgNumber)}
            className={`${props.currentPage === pgNumber ? 'active' : ''}`}
            href='#'>
            {pgNumber}
          </a>
        </div>
      ))}
      <div className='pagination'>
        <a className="pagination" onClick={nextPage} href='#'> Next </a>
      </div>
    </nav>
  )
}

export default Pagination;