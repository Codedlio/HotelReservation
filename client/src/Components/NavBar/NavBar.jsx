import React from "react";
import style from './NavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import imagen from './logo hotel2.png';
import { Link } from "react-router-dom";


  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hoteleternotermal/', '_blank');
  }
    const handleTwitterClick = () => {
    window.open('https://twitter.com/Hoteltereterno', '_blank');
  }
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100093402330219', '_blank');
  }

  
function NavBar() {
  return (
    <div className={style.contenedor}>
      <img className={style.imagen} src={imagen} alt="" />
      
      <Link className={style.link} to='/'>Inicio</Link>
      <Link className={style.link} to='/'>Iniciar sesion</Link>
      <Link className={style.link} to='/contacto'>Contacto</Link>
      <p><a className={style.icon} href="#" onClick={handleInstagramClick}><FontAwesomeIcon icon={faInstagram} /></a></p>
        <p><a className={style.icon} href="#" onClick={handleFacebookClick}><FontAwesomeIcon icon={faFacebook} /></a></p>
        <p><a className={style.icon} href="#" onClick={handleTwitterClick}><FontAwesomeIcon icon={faTwitter} /></a></p>
      <Link  className={style.button} to='/reserva'>RESERVAR AHORA</Link>
    </div>
  );
}

export default NavBar;