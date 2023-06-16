
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";


import style from './NavBar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter, } from "@fortawesome/free-brands-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import imagen from './logo hotel.png';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUsuario } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Carrito from '../Carrito/Carrito';
import {onAuthStateChanged  } from "firebase/auth";
import { setUsuario } from '../redux/action';
import { auth } from "../Loging/firebase";
import Cookies from 'js-cookie';


function NavBar() {
  const token = Cookies.get('token');
  const emailToken = Cookies.get('emailToken');
  const location = useLocation();
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario);
  const [currentPage, setCurrentPage] = useState(1);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [reserva, setReserva] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    let timeout;
    if(token){
      dispatch(setUsuario(emailToken));
    }
    if (mostrarCarrito && !reserva) {
      setMostrarMensaje(true);
  
      timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 2000);
    }
    
    return () => clearTimeout(timeout);
  }, [mostrarCarrito, reserva]);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
        Cookies.set("emailToken", user.email, { expires: 8, secure: true });
        dispatch(setUsuario(user.email))

      // User is signed in, see docs for a list of available properties
      //console.log(user.email);
      // ...
    }
  });
 

  // Función para agregar la reserva al carrito
  const agregarAlCarrito = (nuevaReserva) => {
    setReserva(nuevaReserva);
    setMostrarCarrito(true);
  };

  // Función para ocultar el carrito
  const ocultarCarrito = () => {
    setMostrarCarrito(false);
   
    
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hoteleternotermal/', '_blank');
  };
  const handleTwitterClick = () => {
    window.open('https://twitter.com/Hoteltereterno', '_blank');
  };
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100093402330219', '_blank');
  };

  const handleLogOut = async() => {
    
    Cookies.remove('token');
    Cookies.remove('emailToken');
    dispatch(deleteUsuario());
    
    if (usuario){
      await auth.signOut();
      Cookies.remove('emailToken');
    }
  };
  
  
  
  return (

    <>
    <Navbar collapseOnSelect expand="lg" className={style.contenedor} variant="dark">
      <Container>
      <Navbar.Brand className="logo" href="#home">
      <img className={style.imagen} src={imagen} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle className={style.navHotel} aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

      <Nav className={style.navHotel}>
        {location.pathname !== "/" &&         
          <Link className={style.link} to='/'>Inicio</Link>          
        }        
        <div className={style.dropdown} >        
          <Link className={style.linkHotel} >El hotel</Link>          
          <div className={style.dropdowncontent}>
            <Link className={style.link} to='/historia'>Historia</Link>
            <Link className={style.link} to='/filosofia'>Filosofía</Link>
            <Link className={style.link} to='/bienestar'>Bienestar</Link>
          </div>
        </div>
          <Link className={style.link} to="/paquetes" >Paquetes</Link>
          {usuario === undefined &&
          <Link className={style.link} to='/contenedor'>Iniciar sesión</Link>
        }
        
        {usuario !== undefined &&
          <Link className={style.link} onClick={handleLogOut}>Cerrar sesión</Link>
        }
        <Link  to='/contacto' className={style.link} >Contacto</Link>
        <Nav.Item  href="#" onClick={handleInstagramClick} className={style.icon}><FontAwesomeIcon icon={faInstagram} /></Nav.Item>
        <Nav.Item  href="#" onClick={handleFacebookClick} className={style.icon}><FontAwesomeIcon icon={faFacebook} /></Nav.Item>
        <Nav.Item  href="#" onClick={handleTwitterClick} className={style.icon}><FontAwesomeIcon icon={faTwitter} /></Nav.Item>
        <Link  to='/reserva' className={style.button}>RESERVAR AHORA</Link>
        
        <button className={style.carrito} onClick={() => {
  if (mostrarCarrito) {
    setMostrarCarrito(false);
    setMostrarMensaje(false); // Restablecer el estado de mostrarMensaje al ocultar el carrito
  } else {
    setMostrarCarrito(true);
  }
}}>        <Link className={style.carritolink} to="/detallereserva">
<FontAwesomeIcon icon={faCartPlus} />
</Link>
</button>
{mostrarCarrito ? (
          reserva ? (
            <Carrito reserva={reserva} />
          ) : (
            
            mostrarMensaje && <div className={style.contenedormensaje}><p className={style.mensajeee}>Aun no posee Reservas</p>
            </div>
          )
        ) : null}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;

