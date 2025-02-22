import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/Contact.css'

function ContactPageForm({ service }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  const [services, setServices] = useState();
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/services/');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/contacts/', { 
        service: serviceId,
        name,
        email,
        mobile,
        message,
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id='contact-form'>
        <h2>CONTACT US</h2>
        <div>
            <label htmlFor="service">Service:</label>
            <select id='service' value={serviceId} onChange={(e) => setServiceId(e.target.value)} required> 
            <option value=''>Select a service</option>
            {services && services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            </select>
        </div>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
            <label htmlFor="mobile">Mobile (Optional) :</label>
            <input type="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
    </form>
  );
}

export default ContactPageForm;