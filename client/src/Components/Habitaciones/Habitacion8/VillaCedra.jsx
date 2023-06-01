import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './imagenes/image1.jpg'
import image2 from './imagenes/image2.jpg'
import image3 from './imagenes/image3.jpg'
import image4 from './imagenes/image4.jpg'
import image5 from './imagenes/image5.jpg'

import style from './VillaCedra.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';

const Habitacion1 = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
      <section >
      <h1 className={style.titulo}>Villa Cedra</h1>
        <div className={style.texto}>
        
       
          <p>
          Ubicada entre grandes cedros se encuentra esta<br></br>
           cabaña, independiente y cómoda. Está totalmente<br></br>
            construida por troncos de madera, y el entorno<br></br>
             que brindan los árboles la convierte en un lugar<br></br>
              ideal para disfrutar de la tranquilidad serrana.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>Dispone de un dormitorio matrimonial,<br></br>
      baño con lavatorio en antebaño, living-comedor,<br></br>
       cocina semi separada y entrepiso en balcón<br></br>
       hacia el living con dos camas simples y una <br></br>
       cama matrimonial. También existe la disponibilidad<br></br>
        de colocar una cuna donde se desee.Tiene <br></br>
        estacionamiento techado, para protección <br></br>
        de un vehículo contra granizo.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible para <br></br>un máximo de seis personas.</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}>< FontAwesomeIcon icon={faMoneyBill} /></div>
     
      <p>Revisa el detalle de los valores de esta habitación en <br></br>nuestra política de precios y estadía en nuestro<br></br> Centro de Ayuda.</p>
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
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image4}
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
              src={image5}
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
      
        <div >
            <h2 className={style.caracteristicastitulo}>Incluye</h2>
            </div>
        <section className={style.caracteristicas}>
          
        
          <ul>
            <li>Cama Super King</li>
            <li>Calefacción de tiro balanceado</li>
            <li>Cocina de cuatro hornallas con horno</li>
            <li> Vajilla completa</li>
            <li>Cocina de cuatro hornallas con horno</li>
            <li>Heladera</li>
            <li>Microondas</li>
            <li>TV satelital LED 32</li>
            <li>TV por cable</li>
            <li>Ropa blanca</li>
            <li>Bañeritas, sillitas altas y cuna para bebés</li>
            <li>Asadores individuales</li>
            <li>Luz de emergencia y generador auxiliar</li>
          </ul>
        </section>


        <div className={style.titulodisponibilidad}><h2>Disponibilidad</h2></div>
        <section className={style.disponibilidad}>
          
          <p>Verifica la disponibilidad y realiza tu reserva en línea:</p>
        
        </section>
        <div className={style.containerlink}><a className={style.linka} href="#">Ver disponibilidad</a></div>
        
        <FooterBar className={style.footer} />
      
      
    </div>
  );
};

export default Habitacion1;
