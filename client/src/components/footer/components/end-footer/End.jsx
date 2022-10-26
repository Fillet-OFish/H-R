import React, { useState, useEffect } from 'react';

export default function End({ product }) {

  return(
    <div className="end">
      <small>
        Hack & Reactor / UNISEX / {product.name}
      </small>
    </div>
  )
}