import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

import './css/Services.css'
import ContactForm from './ContactForm'

function ServicePage() {
    const [service, setService] = useState(null);
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImage, setShowImage] = useState(true); 
    const [slideDirection, setSlideDirection] = useState("left");


    useEffect(() => {
        const fetchService = async() => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/services/${id}/`);
                setService(response.data);
            } catch (error) {
                console.log('Error fetching service:', error);
            }
        };

        fetchService();
    }, [id]);

    useEffect(() => {
        if (service && service.images.length > 0) {
          const intervalId = setInterval(() => {
            // Toggle slide direction before hiding the image
            setSlideDirection((prevDirection) =>
              prevDirection === "left"? "right": "left",
            );
      
            setTimeout(() => {
              setShowImage(false); // Hide the current image
      
              setTimeout(() => {
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex + 1) % service.images.length,
                );
                setShowImage(true); // Show the next image
              }, 500); // Adjust delay to match transition duration
            }, 500); // Adjust delay to match transition duration
          }, 7000);
      
          return () => clearInterval(intervalId);
        }
      }, [service, slideDirection]);


    if (!service) {
        return <div>Loading service...</div>
    }

    const currentImage = service.images[currentImageIndex]?.image;

    return (
        <div id="single-service">
          <Paper
            sx={{
              p: 2,
              width: "90%",
              backgroundColor: "lightgray",
            }}
          >
            <h2>{service.title}</h2>
            <div id="image-slide">
              {/* Remove the Slide component */}
              <div>
                {currentImage && (
                  <img src={currentImage} alt={service.title} id="service-image" />
                )}
              </div>
            </div>
            <p>{service.description}</p>
          </Paper>
          <ContactForm service={service} />
        </div>
      );
    }
    

export default ServicePage;