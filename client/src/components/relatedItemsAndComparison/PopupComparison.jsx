import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import StarRatings from './StarRatings.jsx'

export default function PopupComparison ({relatedItem, currentItem, popup, setPopup}) {

  const [display, setDisplay] = useState(popup ? 'block' : 'none')

  useEffect(() => {
    popup ? setDisplay('block') : setDisplay('none')
  }, [popup])

  const modal = {
    display: display, /* Hidden by default */
    zIndex: '100', /* Sit on top */
    position: 'fixed',
    background: '#00000050',
    width: '100%',
    height: '100vh',
    top: '0',
    left: '0'
  }

  const content = {
    display: 'absolute',
    backgroundColor: '#fefefe',
    marginTop: '25%',
    marginLeft: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    border: '1px solid #888',
    borderRadius: '8px',
    padding: '0 5px 10px 5px',
    maxWidth: '40%',
    maxHeight: '50%',
  }

  const comparisonObj = {}
  currentItem.features.map((feature) => {
    comparisonObj[feature.feature] = {valueCurrent: feature.value}
  })
  relatedItem.features.map((feature) => {
    comparisonObj[feature.feature] ? comparisonObj[feature.feature].valueRelated = feature.value : comparisonObj[feature.feature] = {valueRelated: feature.value}
  })



  return (
    <div style={modal} onClick={()=>{setPopup(!popup)}}>

      <div className='comparison-table' style={content}>

        <table>
          <caption>Comparing</caption>
          <thead>
            <tr>
              <th>{currentItem.name}</th>
              <th></th>
              <th>{relatedItem.name}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(comparisonObj).map((feature) => (
              <tr key={feature}>
                <td className='td-left'>{comparisonObj[feature].valueCurrent === true ?  '✓' : comparisonObj[feature].valueCurrent}</td>
                <td className='td-feature'>{feature}</td>
                <td className='td-right'>{comparisonObj[feature].valueRelated === true ?   '✓' : comparisonObj[feature].valueRelated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
