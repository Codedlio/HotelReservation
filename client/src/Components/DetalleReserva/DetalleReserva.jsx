import React ,  { useEffect, useState }from 'react';
import style from './DetalleReserva.module.css';
import { Link } from 'react-router-dom';
import {getReservaByUsuario } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';

function DetalleReserva() {
  const usuario = useSelector(state => state.usuario);
  console.log("usuario");
  console.log(usuario);
  const dispatch = useDispatch();
  let reserva = useSelector((state) => state.reserva);
  
  useEffect(() => { 
    if (usuario)    
        dispatch(getReservaByUsuario(usuario));
  }, [dispatch])
  
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };

  
  const renderDetalleReserva = () => {   
    if (Array.isArray(reserva)) {      
      return reserva.map((re) => {       
        return (         
        <div > 
          <div className={style.encierro}>
              <h1 className={style.tit}>SU RESERVA</h1>
              <h2 className={style.mail} >{re.usuario}</h2>  
              <p className={style.label}>Fecha de entrada:</p>
              <p className={style.label2}>{re.fechaInicio.substring(0,10)}</p>
              <p className={style.label}>Fecha de salida:</p>
              <p className={style.label2}>{re.fechaFin.substring(0,10)}</p>
              
              <p className={style.label}>Precio:</p>
              <p className={style.label2}>${re.costo}</p>    
              <button className={style.buttonpago} >Realizar Pago</button>
          </div>
        </div>
        );
      });
    
  }
  };

  return (
    <div className={style.container}>
      <div >
        <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} onClick={handleClose}>
            X
          </button>
        </Link>        
       
        <div >{renderDetalleReserva()}</div>
        
      </div>
    </div>
  );
}

export default DetalleReserva;
