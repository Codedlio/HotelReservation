import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import NavBar from '../NavBar/NavBar';
import VideoPlayer from "../Video/Video";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import style from './Home.module.css';
import Habitaciones from "../Habitaciones/Habitaciones";
import { useState, useEffect } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import FooterBar from "../FooterBar/FooterBar";
import Caracteristicas from "../Caracteristicas/Caracteristicas";
import Imagenes from "../Imagenes/Imagenes";
import Servicios from "../Servicios/Servicios/Servicios";
import { useDispatch, useSelector } from "react-redux";
import { getHabitaciones } from "../redux/action";

function Home() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const rooms = useSelector(state => state.gethabitaciones);

  useEffect(() => {
    if (!rooms.length) {
      dispatch(getHabitaciones());
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 900, // Duración de la animación en milisegundos
      smooth: true, // Desplazamiento suave habilitado
    });
  };

  return (
    <div  >
      <a href="https://api.whatsapp.com/send?phone=NUMERO_TELEFONO&text=Hola,%20me%20gustaría%20hacer%20una%20consulta" target="_blank" rel="noopener noreferrer" className={style.whatsapp}>
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
      <NavBar />
      
      <VideoPlayer  />
      
      <Caracteristicas />
      <Imagenes />
      <Habitaciones />  

      <Link
        to="top"
        spy={true}
        smooth={true}
        duration={500}
        className={`${style.scroll} ${isVisible ? style.show : ""}`}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Link>
      <Servicios />
      <FooterBar />
    </div>
  );
}

export default Home;
