import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api'; // Import from @react-google-maps/api

import './css/About.css';

const containerStyle = {
  width: '60vw',
  height: '80vh'
};

function About() {
  const center = { lat: 52.5486, lng: -1.9025 };
  const [position, setPosition] = React.useState(center);
  const radius = 96560.64;
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const onLoad = React.useCallback(function callback(map) {
    map.setCenter(center);
    map.setZoom(8);
  },);

  const onUnmount = React.useCallback(function callback(map) {
  },);

  useEffect(() => {
    const handleResize = () => {
      if (map) {
        if (window.innerWidth < 480) {
          map.setZoom(6);
        } else {
          map.setZoom(8); 
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [map]);

  return isLoaded? (
    <div id='about'>
      <h1 className='title-text'>About Us</h1>
      <div className='about-info'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1 </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1 </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1 </p>
      </div>
      <h1 className='title-text'>OUR COVERAGE</h1>
      <div className='location'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center} 
          zoom={8}     
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={position} />
          <Circle
            center={center}
            radius={radius}
            options={{
              fillColor: 'green',
              fillOpacity: 0.3,
              strokeColor: 'red',
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  ): <></>;
}

export default React.memo(About);