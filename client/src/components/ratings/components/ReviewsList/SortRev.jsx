import React from 'react';


const SortRev = (props) => (
  <div>
    <label>{props.numReviews} reviews, sorted by </label>
    <select name='sort' defaultValue={'DEFAULT'} onChange={(e) => props.setSort(e.target.value)}>
      <option value="DEFAULT" disabled>none selected</option>
      <option value='newest'>newest</option>
      <option value='helpful'>helpful</option>
      <option value='relevant'>relevant</option>
    </select>
  </div>
)

export default SortRev;