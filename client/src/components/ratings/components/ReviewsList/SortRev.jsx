import React from 'react';
import { useDarkMode } from '../../../../contexts/DarkMode.jsx'

const SortRev = (props) => {
  const darkMode = useDarkMode()
  return(
    <div className="sort-reviews">
      <label>{props.numReviews} reviews, sorted by </label>
      <select className={`review-sort ${darkMode ? 'review-sort-dark' : null}`} name='sort' defaultValue={'DEFAULT'} onChange={(e) => props.setSort(e.target.value)}>
        <option value="DEFAULT" disabled>none selected</option>
        <option value='newest'>newest</option>
        <option value='helpful'>helpful</option>
        <option value='relevant'>relevant</option>
      </select>
    </div>
  )
}

export default SortRev;