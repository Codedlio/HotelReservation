import React from "react";
import { Nav } from 'rsuite';
import style from './NavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import imagen from './logo hotel.png';
import { Link } from "react-router-dom";

// function NavBar() {
//   return (
//     <div className={style.contenedor}>
//       <img className={style.imagen} src={imagen} alt="" />
      
//       <a className={style.link}><Link to='/'><p>Inicio</p></Link></a>
//       <a className={style.link}><p>Iniciar sesion</p></a>
//       <a className={style.link}><p>Contacto</p></a>
//       <p><a className={style.icon} href="#"><FontAwesomeIcon icon={faInstagram} /></a></p>
//         <p><a className={style.icon} href="#"><FontAwesomeIcon icon={faFacebook} /></a></p>
//         <p><a className={style.icon} href="#"><FontAwesomeIcon icon={faTwitter} /></a></p>
//       <Link  className={style.button} to='/reserva'>RESERVAR AHORA</Link>
//     </div>
//   );
// }
function NavBar() {
  return (
    <div className={style.contenedor}>
      <img className={style.imagen} src={imagen} alt="" />
      <Nav>
    <Nav.Item  className={style.link} active>Inicio</Nav.Item>
    <Nav.Item  className={style.link}>Iniciar sesion</Nav.Item>
<div className={style.dropdown} >
  {/* <button className={style.dropbtn} to='/reserva'>Paquetes</button> */}
  <Link  className={style.dropbtn} to='/paquetes'>Paquetes</Link>
  <div className={style.dropdowncontent}>
    <a href="#">3 días y 2 noches</a>
    <a href="#">3 días y 2 noches</a>
    <a href="#">5 días y 4 noches</a>
  </div>
</div>
    <Nav.Item  className={style.link}>Contacto</Nav.Item>  
    <Nav.Item  className={style.icon} href="#"><FontAwesomeIcon icon={faInstagram} /></Nav.Item>
    <Nav.Item  className={style.icon} href="#"><FontAwesomeIcon icon={faFacebook} /></Nav.Item>
    <Nav.Item  className={style.icon} href="#"><FontAwesomeIcon icon={faTwitter} /></Nav.Item>
    {/* <Nav.Item ><button className={style.button}  to='/reserva'>RESERVAR AHORA</button> </Nav.Item> */}
    <Link  className={style.button} to='/reserva'>RESERVAR AHORA</Link>
  </Nav>
    </div>
  );
}

export default NavBar;