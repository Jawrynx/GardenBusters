import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import './css/Footer.css'

function Footer() {
  return (
    <footer>
        <a href=''><FontAwesomeIcon icon={faFacebook} /></a>
        <p>Copyright &copy; 2025 GardenBusters</p>
    </footer>
  )
}

export default Footer
