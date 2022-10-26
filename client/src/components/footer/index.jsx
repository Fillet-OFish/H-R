import React, { useState, useEffect } from 'react';
import Start from './components/start-footer/Start.jsx';
import End from './components/end-footer/End.jsx';

export default function Footer({product}) {

  return(
    <div className="footer">
      <Start/>
      <End product={product}/>
    </div>
  )
}