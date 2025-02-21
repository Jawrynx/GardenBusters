import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./css/Home.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Home() {
  const bannerRef = useRef(null);
  const pRef = useRef(null);
  const h3Ref = useRef(null);
  const [service, setService] = useState();

  useEffect(() => {
    
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/services/`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, []);

  useEffect(() => {
    if (bannerRef.current && pRef.current && h3Ref.current) {
      bannerRef.current.classList.add("banner-animation");
      pRef.current.classList.add("p-animation");

      setTimeout(() => {
        h3Ref.current.classList.add("h3-animation");
      }, 300);
    }
  },);

  const [alignment, setAlignment] = useState("fencing");

  useEffect(() => {

    // Creates an interval to switch between tabs every 10 seconds
    const intervalId = setInterval(() => {
      const contentSections = document.querySelectorAll(".content-section");
      const currentSection = document.querySelector(`.content-section[data-section="${alignment}"]`);

      const buttonsAll = document.querySelectorAll('.home-services-container > div > button');
      const currentButton = document.querySelector('.home-services-container > div > button.Mui-selected');

      if (currentSection) {
        currentSection.classList.add("hide");
        currentButton.classList.add("hide");

        setTimeout(() => {

          switch (alignment) {
            case "fencing":
              setAlignment("garden-care");
              break;
            case "garden-care":
              setAlignment("paving");
              break;
            case "paving":
              setAlignment("fencing");
              break;
            default:
              setAlignment("fencing");
          }
        }, 500);
      }
    }, 10000); 

    return () => clearInterval(intervalId);
  }, [alignment]);

  // Tab Animation

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  if (!service || service.length === 0) {
    return <div>Loading services...</div>;
  }

  const slabbingService = service.find((service) => service.id === 1);
  const fencingService = service.find((service) => service.id === 2);
  const gardenCare = service.find((service) => service.id === 3);

  return (
    <>
      <div className="home-container">
        <div className="background">
          <div className="banner" ref={bannerRef}>
            <h1>Garden Busters</h1>
            <p ref={pRef}>
              We'll bust up your garden! (and make it look great)!
            </p>
            <h3 ref={h3Ref}>- Birmingham -</h3>
          </div>
        </div>
      </div>
      <div className="home-services-container">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          
          {fencingService && (
            <ToggleButton
              value="fencing"
              sx={{
                backgroundColor: "rgba(0,0,0,0.9)",
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "green",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              Fencing Services
            </ToggleButton>
          )}

          {gardenCare && (
            <ToggleButton
              value="garden-care"
              sx={{
                backgroundColor: "rgba(0,0,0,0.9)",
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "green",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              Garden Care
            </ToggleButton>
          )}

          {slabbingService && (
            <ToggleButton
              value="paving"
              sx={{
                backgroundColor: "rgba(0,0,0,0.9)",
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "green",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              Slabbing & Paving
            </ToggleButton>
          )}
        </ToggleButtonGroup>

        {/* Conditionally render sections based on selected value */}
        {alignment === "fencing" && fencingService && (
          <div className="content-section" data-section="fencing">
            <div>
              <h2>{fencingService.title}</h2>
              <p>
                {fencingService.description}
              </p>
            </div>
            <img src={fencingService.images[0].image} ></img>
            <p>
                {fencingService.detailed_description}
            </p>
          </div>
        )}

        {alignment === "garden-care" && gardenCare && (
          <div className="content-section" data-section="garden-care">
            <div>
              <h2>{gardenCare.title}</h2>
              <p>
                {gardenCare.description}
              </p>
            </div>
            <img src={gardenCare.images[0].image} />
            <p>
                {gardenCare.detailed_description}
            </p>
          </div>
        )}

        {alignment === "paving" && slabbingService && (
          <div className="content-section" data-section="paving">
            <div>
              <h2>{slabbingService.title}</h2>
              <p>
                {slabbingService.description}
              </p>
            </div>
            <img src={slabbingService.images[0].image} />
            <p>
                {slabbingService.detailed_description}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;