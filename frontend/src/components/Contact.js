import React from 'react'
import ContactPageForm from './ContactPageForm'

function Contact() {
  return (
    <div id='contact'>
      <h1 className='title-text'>Contact</h1>
      <p><span>Phone:</span>
      <ul>
        <li><span>Chaz: </span><a href='tel:+447301036525'>07301 036525</a></li>
        <li><span>Gaz: </span><a href='tel:+447704675085'>07704 675085</a></li>
        <li><span>WhatsApp: </span><a href='tel:+447305194286'>07305 194286</a></li>
      </ul>
      </p>
      <p><span>Facebook:</span><a href='https://facebook.com/'>GardenBusters</a></p>
      <ContactPageForm />
    </div>
  )
}

export default Contact
