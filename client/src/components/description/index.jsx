import React, { useState } from 'react';

export default function Description({product}) {

  return(
    <div className="description">
      <div className="d-left">
      <p className="product-slogan">{product.slogan}</p>
      <p>{product.description}</p>
      </div>
      <div className="d-right">
       <p className="product-features">Features</p>
       {product.features ? product.features.map(one => <p className="product-feature" key={one.feature}>&nbsp;- {one.feature}{one.value!==null ? `:` : null} {one.value}</p>) : <p>N/a</p>}
      </div>
    </div>
  )
}