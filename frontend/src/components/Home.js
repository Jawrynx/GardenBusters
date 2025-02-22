import React, { useCallback, useEffect, useRef, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Testimonial from "./Testimonial";
import "./css/Home.css";
import "./css/Carousel.scss"
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Home() {
  const bannerRef = useRef(null);
  const pRef = useRef(null);
  const h3Ref = useRef(null);
  const [service, setService] = useState();
  const [slides, setSlides] = useState();


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
    const fetchBeforeAfter = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/beforeafter/'); // Replace with your actual API endpoint
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching BeforeAfter data:', error);
      }
    };

    fetchBeforeAfter();
  },[]);

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


const Slide = ({ imageSrc, title, subtitle }) => (
  <>
    <img src={imageSrc} alt={title} />
    <div className="carousel-caption">
      <h3 className="carousel-caption-title">{title}</h3>
      <p className="carousel-caption-subtitle">{subtitle}</p>
    </div>
  </>
);

const CarouselButton = ({ useTriangle, color, disabled, clickHandler, icon, isLeftIcon }) => (
  <div className={`carousel-${isLeftIcon ? 'left' : 'right'}-arrow carousel-control`}>
    <div
      className={useTriangle ? `${isLeftIcon ? 'left' : 'right'}-triangle` : ''}
      style={{
        ...(isLeftIcon
          ? { borderLeftColor: useTriangle ? color : '' }
          : { borderRightColor: useTriangle ? color : '' }),
      }}
    />
    <button
      className={!useTriangle ? `padding-${isLeftIcon ? 'left' : 'right'}-15` : ''}
      disabled={disabled}
      onClick={clickHandler}
    >
      {icon}
    </button>
  </div>
);

const CarouselIndicators = ({
  position,
  nextActiveIndex,
  indicatorsColor,
  clickHandler,
  slides,
}) => (
  <ol className={`carousel-indicators ${position}`}>
    {slides.map((el, i) => (
      <li
        key={i}
        className={i === nextActiveIndex ? 'active' : ''}
        //eslint-ignore-next-line
        style={{ '--indicatorsColor': indicatorsColor }}
        onClick={() => {
          slides.length !== 1 && i !== nextActiveIndex && clickHandler(i);
        }}
      />
    ))}
  </ol>
);

const Carousel = ({
  autoPlay = false,
  activeSlideDuration = 3000, //how long a slide will be displayed
  interactionMode = 'swipe', //swipe or hover
  indicatorsColor = '#ffffff',
  alignIndicators = 'center', //center, left, right
  alignCaption = 'center', //center, left, right
  useRightLeftTriangles = false,
  leftTriangleColor = '#ffffff',
  leftIcon,
  rightTriangleColor = '#ffffff',
  rightIcon,
  slides = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextActiveIndex, setNextActiveIndex] = useState(0);
  const [activeIndexClasses, setActiveIndexClasses] = useState(['active-slide']);
  const [nextActiveIndexClasses, setNextActiveIndexClasses] = useState([]);
  const [disablePrevNext, setDisablePrevNext] = useState(false);
  const [xCoordinate, setXCoordinate] = useState(null);
  // use it to set the indicator position based on the coming (alignIndicators) prop
  const [indicatorPosition, setIndicatorPosition] = useState('position-center');
  /*will be used to reset classes after animating the transition from a slide to another
        (it has to be equal to the animation duration in the css
        classes [enter-to-left, exit-to-left, enter-to-right, exit-to-right])*/
  const animationDuration = 600;
  // will be used to autoplay the carousel
  const autoSlide = useRef(null);
  // used to detect slider direction when clicking the buttons to change slides
  const direction = useRef('to-left');

  useEffect(() => {
    if (alignIndicators === 'right') {
      setIndicatorPosition('position-right');
    } else if (alignIndicators === 'left') {
      setIndicatorPosition('position-left');
    }
  }, [alignIndicators]);

  // show the next slide in the view port based on the direction
  const animateSliding = useCallback(() => {
    let newActiveIndexClasses = [];
    let newNextActiveIndexClasses = [];

    // attach the following classes if the user click the next button
    if (direction.current === 'to-left') {
      newActiveIndexClasses.push('active-slide', 'exit-to-left');
      newNextActiveIndexClasses.push('active-slide', 'next-active-slide', 'enter-to-left');
    } else {
      // attach the following classes if the user click the prev button
      newActiveIndexClasses.push('active-slide', 'exit-to-right');
      newNextActiveIndexClasses.push('active-slide', 'next-active-slide', 'enter-to-right');
    }

    setActiveIndexClasses(newActiveIndexClasses);
    setNextActiveIndexClasses(newNextActiveIndexClasses);
  }, []);

  const setActiveSlide = (nextActiveI) => {
    setActiveIndex(nextActiveI);
    setActiveIndexClasses(['active-slide']);
    setNextActiveIndexClasses([]);
    setDisablePrevNext(false);
  };

  // used to restart auto sliding when user click prev, next button or on the carousel indicator
  const restartAutoSliding = useCallback(
    (nextAcIn) => {
      setNextActiveIndex(nextAcIn);
      setDisablePrevNext(true);

      // attach the required classes to animate the transition between slides
      animateSliding();

      let startId = null;
      // reset classes and enable prev & next btns after the animation duration
      startId = setTimeout(() => {
        setActiveSlide(nextAcIn);
        clearInterval(startId);
      }, animationDuration);

      // restart auto sliding
      autoSlide.current = autoPlay
        ? setInterval(() => {
            //stop auto sliding (so that when user click the next button we can reset the timer for auto sliding)
            stopAutoSliding();

            // set direction to left because slide is coming from the right side to the view port
            direction.current = 'to-left';

            // set the next active index
            let nextActiveI = activeIndex + 1;

            // if we reach the last slide reset the next active index to 0
            if (nextActiveI === slides.length) {
              nextActiveI = 0;
            }

            // restart auto sliding
            restartAutoSliding(nextActiveI);
          }, activeSlideDuration)
        : null;
    },
    [animateSliding, activeSlideDuration, activeIndex, autoPlay, slides.length]
  );

  const nextSlide = useCallback(() => {
    //stop auto sliding (so that when user click the next button we can reset the timer for auto sliding)
    stopAutoSliding();

    // set direction to left because slide is coming from the right side to the view port
    direction.current = 'to-left';

    // set the next active index
    let nextActiveI = activeIndex + 1;

    // if we reach the last slide reset the next active index to 0
    if (nextActiveI === slides.length) {
      nextActiveI = 0;
    }

    // restart auto sliding
    restartAutoSliding(nextActiveI);
  }, [activeIndex, slides.length, restartAutoSliding]);

  const startAutoSliding = useCallback(() => {
    autoSlide.current = autoPlay ? setInterval(nextSlide, activeSlideDuration) : null;
  }, [autoPlay, activeSlideDuration, nextSlide]);

  const stopAutoSliding = () => {
    clearInterval(autoSlide.current);
  };

  useEffect(() => {
    startAutoSliding();
    return () => stopAutoSliding();
  }, [startAutoSliding]);

  // used to unify the touch and click cases
  const unify = (e) => (e.changedTouches ? e.changedTouches[0] : e);

  // get and set the x coordinate
  const getSetXCoordinate = (e) => setXCoordinate(unify(e).clientX);

  // move the slide based on the swipe direction
  const moveSlide = (e) => {
    if (xCoordinate || xCoordinate === 0) {
      const dx = unify(e).clientX - xCoordinate;
      const s = Math.sign(dx);

      if (s < 0) {
        nextSlide();
      } else if (s > 0) {
        prevSlide();
      }
    }
  };

  const prevSlide = () => {
    //stop auto sliding (so that when user click the prev button we can reset the timer for auto sliding)
    stopAutoSliding();

    // set direction to right because slide is coming from the left side to the view port
    direction.current = 'to-right';

    // set the next active index
    let nextActiveI = activeIndex - 1;

    // if we are at the first slide set the next active index to the last slide
    if (nextActiveI < 0) {
      nextActiveI = slides.length - 1;
    }

    // restart auto sliding
    restartAutoSliding(nextActiveI);
  };

  const onCarouselIndicator = (index) => {
    //stop auto sliding
    stopAutoSliding();

    // set the next active index
    let nextActiveI = index;

    // set the direction of the carousel based on the clicked indicator index
    if (nextActiveI < activeIndex) {
      direction.current = 'to-right';
    } else {
      direction.current = 'to-left';
    }

    // restart auto sliding
    restartAutoSliding(nextActiveI);
  };

  return (
    <div
      className="carousel-slider-wrapper"
      style={{
        cursor: interactionMode === 'swipe' ? 'pointer' : '',
      }}
      onMouseDown={(e) => {
        if (interactionMode !== 'swipe') {
          return;
        }
        getSetXCoordinate(e);
      }}
      onTouchStart={(e) => {
        if (interactionMode !== 'swipe') {
          return;
        }
        getSetXCoordinate(e);
      }}
      onMouseUp={(e) => {
        if (disablePrevNext || interactionMode !== 'swipe') {
          return;
        }
        moveSlide(e);
      }}
      onTouchEnd={(e) => {
        if (disablePrevNext || interactionMode !== 'swipe') {
          return;
        }
        moveSlide(e);
      }}
      onMouseMove={(e) => {
        if (interactionMode !== 'swipe') {
          return;
        }
        e.preventDefault();
      }}
      onTouchMove={(e) => {
        if (interactionMode !== 'swipe') {
          return;
        }
        e.preventDefault();
      }}
    >
      {/*(onMouseDown & onTouchStart) & (onMouseUp & onTouchEnd) used to detect the motion direction*/}
      {/*(onMouseMove & onTouchMove) used to prevent edge from navigating the
                 opposite motion direction (also sometimes on chrome)*/}
      {slides.map((el, i) => {
        let classes = '';

        if (i === activeIndex) {
          classes = activeIndexClasses.join(' ');
        } else if (i === nextActiveIndex) {
          classes = nextActiveIndexClasses.join(' ');
        }

        return (
          <div
            key={i}
            className={`carousel-slide ${classes} ${interactionMode === 'swipe' ? 'swipe' : ''}`}
            style={{ textAlign: alignCaption }}
            // the following events to pause the auto slide on hover
            onMouseEnter={() => {
              if (interactionMode !== 'hover') {
                return;
              }
              stopAutoSliding();
            }}
            onMouseLeave={() => {
              if (interactionMode !== 'hover') {
                return;
              }
              startAutoSliding();
            }}
          >
            <Slide imageSrc={el.image} title={el.title} subtitle={el.subtitle} />
          </div>
        );
      })}
      {/* carousel controls*/}
      <CarouselButton
        useTriangle={useRightLeftTriangles}
        color={leftTriangleColor}
        disabled={disablePrevNext}
        clickHandler={() => {
          slides.length !== 1 && prevSlide();
        }}
        icon={
          leftIcon ? (
            leftIcon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              fill={useRightLeftTriangles ? '#000000' : '#ffffff'}
            >
              <path d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" />
            </svg>
          )
        }
        isLeftIcon
      />
      <CarouselButton
        useTriangle={useRightLeftTriangles}
        color={rightTriangleColor}
        disabled={disablePrevNext}
        clickHandler={() => {
          slides.length !== 1 && nextSlide();
        }}
        icon={
          rightIcon ? (
            rightIcon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              fill={useRightLeftTriangles ? '#000000' : '#ffffff'}
            >
              <path d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" />
            </svg>
          )
        }
      />
      {/*carousel indicators*/}
      <CarouselIndicators
        position={indicatorPosition}
        nextActiveIndex={nextActiveIndex}
        indicatorsColor={indicatorsColor}
        clickHandler={onCarouselIndicator}
        slides={slides}
      />
    </div>
  );
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
      <div className="home-content-container">
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
        <div className="beforeAfters">
        <h3>Before / After</h3>
        <Carousel autoPlay={true} useRightLeftTriangles={true} slides={slides} />
        </div>
      </div>
      <div className="testimonials">
        <Testimonial />
      </div>
    </>
  );
}

export default Home;