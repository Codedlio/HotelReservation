import React from "react";
import { Nav } from 'rsuite';
import style from './NavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import imagen from './logo hotel.png';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUsuario } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario);
  const [currentPage, setCurrentPage] = useState(1);
  let i = 1;
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hoteleternotermal/', '_blank');
  }
  const handleTwitterClick = () => {
    window.open('https://twitter.com/Hoteltereterno', '_blank');
  }
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100093402330219', '_blank');
  }
  const handleClick = (e, index) => {
    e.preventDefault();
    console.log(e);
    setCurrentPage(index);
    i=index;
  };
  const handleLogOut = () => {
    dispatch(deleteUsuario())
  };

  return (
    <div className={style.contenedor}>
      <img className={style.imagen} src={imagen} alt="" />
      <Nav>
        {location.pathname !== "/" &&
          <Link className={style.link} to='/'>Inicio</Link>
        }        
        <div className={style.dropdown} >
          <Link className={style.link} >El hotel</Link>
          <div className={style.dropdowncontent}>
            <Link className={style.link} to='/historia'>Historia</Link>
            <Link className={style.link} to='/filosofia'>Filosofía</Link>
            <Link className={style.link} to='/bienestar'>Bienestar</Link>

          </div>
        </div>
        <div className={style.dropdown} >

          <Link className={style.link} to='/paquetes'>Paquetes</Link>
          <div className={style.dropdowncontent}>
            <a href="#">3 días y 2 noches</a>
            <a href="#">4 días y 3 noches</a>
            <a href="#">5 días y 4 noches</a>
            <a href="#">6 días y 5 noches</a>
          </div>
        </div>
        {usuario === undefined &&
          <Link className={style.link} to='/contenedor'>Iniciar sesion</Link>
        }
        {usuario === undefined &&
          <Link className={style.link} to='/contacto'>Contacto</Link>
        }
        {usuario !== undefined &&
          <Link className={style.link} onClick={handleLogOut}>Log out</Link>
        }
        <Nav.Item className={style.icon} href="#" onClick={handleInstagramClick}><FontAwesomeIcon icon={faInstagram} /></Nav.Item>
        <Nav.Item className={style.icon} href="#" onClick={handleFacebookClick} ><FontAwesomeIcon icon={faFacebook} /></Nav.Item>
        <Nav.Item className={style.icon} href="#" onClick={handleTwitterClick}><FontAwesomeIcon icon={faTwitter} /></Nav.Item>
       
          <Link className={style.button} to='/reserva'>RESERVAR AHORA</Link>
        
      </Nav>
    </div>
  );
}

export default NavBar;