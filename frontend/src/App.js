import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './components/Home'; // Import your components
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Navbar from './components/Navbar'; 
import './App.css';

function App() {
  return (
    <div>
      <Navbar /> {/* Use the Navbar component */}

      <div className="App">
        <Routes> {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;