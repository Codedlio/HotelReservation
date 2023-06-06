import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './Suite Canelo/1.jpg'
import image2 from './Suite Canelo/2.jpg'
import image3 from './Suite Canelo/3.jpg'
import image4 from './Suite Canelo/4.jpg'
import image5 from './Suite Canelo/5.jpg'
import image6 from './Suite Canelo/6.jpg'
import { useDispatch, useSelector } from 'react-redux';
import style from './Habitacion2.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import Paginado from '../../Paginate/Paginate';
import { set_Currents_Page } from '../../redux/action';
import { useEffect } from 'react';

const Habitacion2 = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const habitaciones = useSelector((state) => state.set_Current_Page); // Cambiar "state.set_Current_Page" por el nombre correcto
 
  const [currentPage, setCurrentPage] = useState(2);
  const habsPerPage = 1;
  const indexofLastRoom = currentPage * habsPerPage;
  const indexofFirstRoom = indexofLastRoom - habsPerPage;
  const visibleHabitaciones = habitaciones.slice(indexofFirstRoom, indexofLastRoom);

 

  useEffect(() => {
    dispatch(set_Currents_Page(currentPage));
  }, [dispatch, currentPage]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
      <section >
      <h1 className={style.titulo}>Suite Canell</h1>
        <div className={style.texto}>
        
       
          <p>
          Con una cómoda tinaja privada a los pies del río,<br></br>  vistas hacia el bosque,y en medio de un entorno<br></br>  natural único, suite Canell destaca por por su acogedor<br></br>  entorno, 2 ambientes, luminosidad y decoración con <br></br>cálidos materiales y elementos sureños.<br></br> Queremos que tengas la más cómoda y acogedora estadía.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>Esta habitación posee cama súper King,<br></br> cama Nido y/o camas adicionales. Cuenta con<br></br> terraza y salida directa al río Liucura, vistas al<br></br> bosque, caja de seguridad, aire acondicionado y<br></br> calefacción termal, Tv cable,<br></br> batas, desayuno buffet y teléfono.</p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible <br></br>para un máximo de 4 personas.</p>
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
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image6}
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
            <li>Vistas panorámicas</li>
            <li>Aire Acondicionado</li>
            <li>Calefaccion termal</li>
            <li>Cama Super King</li>
            <li>Hidromasaje</li>
            <li>Telefono</li>
            <li>Salida al rio</li>
            <li>Terraza</li>
            <li>Caja de Seguridad</li>
            <li>TV por cable</li>
          </ul>
        </section>


        <div className={style.titulodisponibilidad}><h2>Disponibilidad</h2></div>
        <section className={style.disponibilidad}>
          
          <p>Verifica la disponibilidad y realiza tu reserva en línea:</p>
        
        </section>
        <div className={style.containerlink}><a className={style.linka} href="#">Ver disponibilidad</a></div>
        <habitaciones habitaciones={visibleHabitaciones} />
      
        <Paginado gamesPerPage={habsPerPage} habitaciones={habitaciones.length} paginado={setCurrentPage} currentPage={currentPage} />

        <FooterBar className={style.footer} />
      
      
    </div>
  );
};

export default Habitacion2;
