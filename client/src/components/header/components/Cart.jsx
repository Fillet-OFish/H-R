import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cart({product}) {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    axios.get('/api/cart')
      .then(res => setCart(res.data))
  },[product])

  return(
    <div className="cart-block">
      <h1>Your bag</h1>
        <hr/>
        {JSON.stringify(cart)}
    </div>
  )
}