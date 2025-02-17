import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ServiceList from './ServiceList'
import './css/Services.css'

function Services() {
  const [service, setService] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${id}/`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [id]);

  return (
    <div>
      <h1 className='title-text'>Services</h1>
      <ServiceList />
    </div>
  )
}

export default Services
