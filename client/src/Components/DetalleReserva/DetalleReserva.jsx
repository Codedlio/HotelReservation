import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './image1.jpg'
import image2 from './image2.jpg'
import image3 from './image3.jpg'

import style from './DetalleReserva.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faPeace, faOm } from '@fortawesome/free-solid-svg-icons';



const DetalleReserva = () => {
  const [index, setIndex] = useState(0);
  const dataReservation=window.sessionStorage.getItem('dataReservation');
  console.log(dataReservation);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
      <section >
      <h1 className={style.titulo}>DetalleReserva</h1>
        <div className={style.texto}>
        
       
          <p>
          Ofrecemos clases de DetalleReserva que nos ayuda a relajarnos,<br></br>
          a reducir el estrés, a mejorar nuestra concentración<br></br>
           y nos ayuda a mejorar la confianza en uno mismo.<br></br>
           Contamos con profesionales especializados en el<br></br>
            tema. Nada mejor que iniciar el día con estas clases.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}> <FontAwesomeIcon icon={faChild} /></div>
      
     
      
    </div>
      <p>Encuentros al aire libre y tambien <br></br>
      resguardado bajo techo.<br></br>
      El mejor tipo de DetalleReserva para principiantes.<br></br>
     Mejore su salud y su fisico.
      </p>
    </div>
  
  
   
    </div>
        
        </section>
      <div 
      className="container w-100">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image1}
              alt="First slide"
              width={"100%"}
              height={"750px"}
            />
            
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image2}
              alt="First slide"
              width="100%"
              height="750px"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image3}
              alt="First slide"
              width="100%"
              height="750px"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        
        </Carousel>
      </div>
      <div className={style.espacio}></div>
      
        <FooterBar className={style.footer} />
      
      
    </div>
  );
};

export default DetalleReserva;
