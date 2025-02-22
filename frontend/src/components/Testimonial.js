import React, { useEffect, useState } from 'react'
import './css/Testimonial.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Testimonial() {
  const [testimonial, setTestimonial] = useState();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/testimonial/');
        setTestimonial(response.data);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      }
    };

    fetchTestimonial();
  },[]);
  
  return (
    <div className='testimonial-card'>
      <div className='stars'>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
      {testimonial? (
        <>
          <h2>"{testimonial[0].testimonial}"</h2>
          <h3>- <em>{testimonial[0].name}</em></h3>
        </>
      ): (
        <p>Loading testimonial...</p>
      )}
    </div>
  );
}

export default Testimonial
