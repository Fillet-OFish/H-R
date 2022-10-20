import React from 'react';
import { useTracker } from '../TrackClickContext.jsx';


export default function PopupComparison ({relatedItem, currentItem, setPopup}) {

  const clickTracker = useTracker();
  const comparisonObj = {}
  currentItem.features.map((feature) => {
    comparisonObj[feature.feature] = {valueCurrent: feature.value}
  })
  relatedItem.features.map((feature) => {
    comparisonObj[feature.feature] ? comparisonObj[feature.feature].valueRelated = feature.value : comparisonObj[feature.feature] = {valueRelated: feature.value}
  })

  return (
    <div className='popup' onClick={(e)=>{setPopup(false); clickTracker(e, 'Related Items & Outfit Creation')}}>
      <div className='comparison-table'>
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
