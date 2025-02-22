import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './components/Home'; // Import your components
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Testimonial from './components/Testimonial';
import Navbar from './components/Navbar'; 
import ServicePage from './components/ServicePage';
import './App.css';

function App() {
  useEffect(() => {
    const preventFocus = (event) => {
      event.preventDefault();
    };
  
    document.addEventListener('focusin', preventFocus);
  
    return () => {
      document.removeEventListener('focusin', preventFocus);
    };
  },);

  return (
    <div>
      <Navbar /> {/* Use the Navbar component */}

      <div className="App">
        <Routes> {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;