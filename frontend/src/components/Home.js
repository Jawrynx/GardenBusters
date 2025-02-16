import React, { useEffect, useRef } from 'react'
import gardenImage from './media/garden.jpg'

import './css/Home.css'


function Home() {
  const bannerRef = useRef(null);
  const pRef = useRef(null);
  const h3Ref = useRef(null);

  useEffect(() => {
    if (bannerRef.current && pRef.current && h3Ref.current) {
      bannerRef.current.classList.add('banner-animation');
      pRef.current.classList.add('p-animation');
      
      setTimeout(() => {
        h3Ref.current.classList.add('h3-animation');
      }, 300);
    }
  },);

  return (
    <div className='home-container'>
      <div className='background'>
        <div className="banner" ref={bannerRef}>
          <h1>Garden Busters</h1>
          <p ref={pRef}>We'll bust up your garden! (and make it look great)!</p>
          <h3 ref={h3Ref}>- Birmingham -</h3>
        </div>
      </div>
    </div>
  )
}

export default Home
