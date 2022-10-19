import React from 'react';


const SearchQues = (props) => (
  // search button is created using svg
  <div>
    <form className ='search-form'>
      {/* if input letters is less than 3 keep rendering data, else start filtering */}
      <input type='text' className ='search-input' placeholder='Have a question? Search for answers…' onChange={(e) => (e.target.value.length > 2) ? props.searchFilter(e.target.value) : props.searchFilter([])} >
      </input>
      {/* button rendering */}
      <button type='submit' className='search-button'>
        <svg className='search-svg' viewBox="0 0 1024 1024">
          <path d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z">
          </path>
        </svg>
      </button>
    </form>
    <br></br>
  </div>
)

export default SearchQues;