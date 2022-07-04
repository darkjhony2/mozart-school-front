import React from 'react'
import PropTypes from 'prop-types'
import {UncontrolledCarousel } from 'reactstrap'
import image1 from '../assets/img/image1.png';
import image2 from '../assets/img/image2.png';
import image3 from '../assets/img/image3.png';
const Home = props => {
  return (
    <div>
      <h1 class="animate__animated animate__heartBeat text-center mt-5 mb-5" style={{ color: 'black' }}>
        Bienvenido al DashBoard de la I.E.P. Amadeo Mozart
      </h1>
      <UncontrolledCarousel
        items={[
          {
            altText: 'Slide 1',
            caption: 'Autonomía moral, social e intelectual',
            key: 1,
            src: image1
          },
          {
            altText: 'Slide 2',
            caption: 'El valor de la identidad viene con un propósito',
            key: 2,
            src: image2
          },
          {
            altText: 'Slide 3',
            caption: 'No hay mejor profesor que el que cree en sus alumnos',
            key: 3,
            src: image3
          }
        ]}
      />
      <h2 class="text-center mt-4 mb-2" style={{ color: 'black' }}>
        "La educación es el arma más poderosa que puedes usar para cambiar el mundo"
      </h2>
      <h7 style={{ color: 'lead', float: 'right' }}>
        Nelson Mandela
      </h7>
    </div>

  )
}

Home.propTypes = {}

export default Home