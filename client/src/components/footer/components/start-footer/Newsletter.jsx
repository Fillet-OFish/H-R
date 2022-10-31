import React from 'react';

export default function Newsletter() {

  return(
    <div className="col1">
        <p className="start-title">SIGN UP FOR HACK & REACTOR'S NEWSLETTER</p>
        <p>To be in the know of our latest updates.</p>

        <form className='newsletter-bar'>
          <input placeholder='Email'/>
        </form>
    </div>
  )
}