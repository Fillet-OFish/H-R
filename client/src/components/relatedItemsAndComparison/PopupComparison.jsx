import React, { useEffect, useState, useRef, useReducer } from 'react';
import axios from 'axios';
import StarRatings from './StarRatings.jsx'

export default function PopupComparison ({relatedItem, currentItem, popup, setPopup}) {

  const [display, setDisplay] = useState(popup ? 'block' : 'none')

  const popupRef = useRef(null);

  useEffect(() => {
    popup ? setDisplay('block') : setDisplay('none')
  }, [popup])

  useEffect(() => {
    if (display === 'block') {
      popupRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
  }, [display])

  const modal = {
    display: display, /* Hidden by default */
    position: 'absolute', /* Stay in place */
    zIndex: '100', /* Sit on top */
    left: '50%',
    top: '-40%',
    WebkitTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)',
    overflow: 'auto', /* Enable scroll if needed */
    overflowBlcok: 'visible',
  }

  const content = {
    backgroundColor: '#fefefe',
    // margin: '15% auto', /* 15% from the top and centered */
    padding: '20px',
    border: '1px solid #888',
    borderRadius: '7px',
    width: '800px', /* Could be more or less, depending on screen size */
    height: '500px',
    textAlign: 'center'
  }

  const comparisonObj = {}
  currentItem.features.map((feature) => {
    comparisonObj[feature.feature] = {valueCurrent: feature.value}
  })
  relatedItem.features.map((feature) => {
    comparisonObj[feature.feature] ? comparisonObj[feature.feature].valueRelated = feature.value : comparisonObj[feature.feature] = {valueRelated: feature.value}
  })



  return (
    <div style={modal} ref={popupRef} >

      <div style={content} onClick={()=>{setPopup(!popup)}}>

        <table style={{width: '100%'}}>
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
                <td>{comparisonObj[feature].valueCurrent === true ?  '✓' : comparisonObj[feature].valueCurrent}</td>
                <td>{feature}</td>
                <td>{comparisonObj[feature].valueRelated === true ?   '✓' : comparisonObj[feature].valueRelated}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>click anywhere in the box to exit </p>
      </div>
    </div>
  )
}
