import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./css/Home.css";

function Home() {
  const bannerRef = useRef(null);
  const pRef = useRef(null);
  const h3Ref = useRef(null);

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

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
            Fencing
          </ToggleButton>
          <ToggleButton
            value="gardening"
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
            Gardening
          </ToggleButton>
          <ToggleButton
            value="slabbing"
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
            Slabbing
          </ToggleButton>
        </ToggleButtonGroup>
        {/* Conditionally render sections based on selected value */}
        {alignment === "fencing" && (
          <div className="content-section">
            <h2>Fencing Services</h2>
            <p>
              We offer a wide range of fencing services, including
              installation, repair, and replacement.
            </p>
            {/* Add more content for fencing services */}
          </div>
        )}

        {alignment === "gardening" && (
          <div className="content-section">
            <h2>Gardening Services</h2>
            <p>
              Our expert gardeners can help you create and maintain a beautiful
              garden.
            </p>
            {/* Add more content for gardening services */}
          </div>
        )}

        {alignment === "slabbing" && (
          <div className="content-section">
            <h2>Slabbing Services</h2>
            <p>
              We provide professional slabbing services for patios, walkways,
              and more.
            </p>
            {/* Add more content for slabbing services */}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;