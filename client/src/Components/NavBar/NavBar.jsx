import React from "react";
import style from './NavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import imagen from './logo hotel.png';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className={style.contenedor}>
      <img className={style.imagen} src={imagen} alt="" />
      
      <a className={style.link}><Link to='/'><p>Inicio</p></Link></a>
      <a className={style.link}><p>Iniciar sesion</p></a>
      <a className={style.link}><p>Contacto</p></a>
      <p><a className={style.icon} href="#"><FontAwesomeIcon icon={faInstagram} /></a></p>
        <p><a className={style.icon} href="#"><FontAwesomeIcon icon={faFacebook} /></a></p>
        <p><a className={style.icon} href="#"><FontAwesomeIcon icon={faTwitter} /></a></p>
      <Link  className={style.button} to='/reserva'>RESERVAR AHORA</Link>
    </div>
  );
}

export default NavBar;