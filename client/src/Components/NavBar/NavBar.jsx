
import React from "react";
import { Nav } from 'rsuite';
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

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario);
  const [currentPage, setCurrentPage] = useState(1);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [reserva, setReserva] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    let timeout;
  
    if (mostrarCarrito && !reserva) {
      setMostrarMensaje(true);
  
      timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 2000);
    }
  
    return () => clearTimeout(timeout);
  }, [mostrarCarrito, reserva]);

  // Función para agregar la reserva al carrito
  const agregarAlCarrito = (nuevaReserva) => {
    setReserva(nuevaReserva);
    setMostrarCarrito(true);
  };

  // Función para ocultar el carrito
  const ocultarCarrito = () => {
    setMostrarCarrito(false);
   
    
  };

  let a = 1;
  let b = 2;
  let c = 3;
  let d = 4;  
  let e = 3;
  let f = 4;
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hoteleternotermal/', '_blank');
  };
  const handleTwitterClick = () => {
    window.open('https://twitter.com/Hoteltereterno', '_blank');
  };
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100093402330219', '_blank');
  };
  const handleClick = (e, index) => {
    e.preventDefault();
    console.log(e);
    setCurrentPage(index);
    a=index;
    b=index;
    c=index;
    d=index;    
    e=index;
    f=index;
  };
  const handleLogOut = () => {
    dispatch(deleteUsuario());
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
        <div className={style.dropdown}>
          <Link className={style.link} to='/paquetes'>Paquetes</Link>
          {/* <div className={style.dropdowncontent}>
            <a href="#">3 días y 2 noches</a>
            <a href="#">4 días y 3 noches</a>
            <a href="#">5 días y 4 noches</a>
            <a href="#">6 días y 5 noches</a>
          </div> */}
        </div>
        {usuario === undefined &&
          <Link className={style.link} to='/contenedor'>Iniciar sesión</Link>
        }
        {usuario === undefined &&
          <Link className={style.link} to='/contacto'>Contacto</Link>
        }
        {usuario !== undefined &&
          <Link className={style.link} onClick={handleLogOut}>Cerrar sesión</Link>
        }
        <Nav.Item className={style.icon} href="#" onClick={handleInstagramClick}><FontAwesomeIcon icon={faInstagram} /></Nav.Item>
        <Nav.Item className={style.icon} href="#" onClick={handleFacebookClick}><FontAwesomeIcon icon={faFacebook} /></Nav.Item>
        <Nav.Item className={style.icon} href="#" onClick={handleTwitterClick}><FontAwesomeIcon icon={faTwitter} /></Nav.Item>
       
        <Link className={style.button} to='/reserva'>RESERVAR AHORA</Link>
        
        {/* Agrega el botón para mostrar el carrito */}
        <button className={style.carrito} onClick={() => {
  if (mostrarCarrito) {
    setMostrarCarrito(false);
    setMostrarMensaje(false); // Restablecer el estado de mostrarMensaje al ocultar el carrito
  } else {
    setMostrarCarrito(true);
  }
}}>
           {/* <Link className={style.carritolink} to="/detallereserva"> */}
    <FontAwesomeIcon icon={faCartPlus} />
  {/* </Link> */}
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
    </div>
  );
}

export default NavBar;

