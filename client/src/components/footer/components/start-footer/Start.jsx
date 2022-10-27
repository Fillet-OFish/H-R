import React, { useState, useEffect } from 'react';
import Newsletter from './Newsletter.jsx'

export default function Start() {

  return(
    <div className="start">
      <Newsletter/>

      <div className="col2">
        <p className="start-title">hack & reactor</p>
        <p><a href='https://github.com/Fillet-OFish/Frontend-Capstone-Ecommerce'>About Us</a></p>
        <p><a href='/'>Sustainability</a></p>
        <p><a href='/'>Accessibility</a></p>
        <p><a href='/'>Giftcards</a></p>
        <p><a href='/'>The Hack & Reactor App</a></p>

      </div>

      <div className="col2">
        <p className="start-title">get help</p>
        <p><a href='/'>Contact Us</a></p>
        <p><a href='/'>Size Guide</a></p>
        <p><a href='/'>Shipping</a></p>
        <p><a href='/'>Returns & Exchanges</a></p>
        <p><a href='/'>Order Tracking</a></p>
        <p><a href='/'>Send Us Feedback</a></p>
      </div>

    </div>
  )
}