import React ,  { useEffect, useState }from 'react';
import style from './DetalleReserva.module.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {getReservaByUsuario } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
function DetalleReserva() {
  const emailToken = Cookies.get('emailToken');
  const usuario = useSelector(state => state.usuario);
  //console.log("usuario");
  //console.log(usuario);
  const dispatch = useDispatch();
  let reserva = useSelector((state) => state.reserva);
  
  useEffect(() => { 
    if (usuario||emailToken)    
        dispatch(getReservaByUsuario(usuario||emailToken));
  }, [dispatch])
  
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };
  const handlePayment = async () => {
    const stripe = Cookies.get("stripe");
    const stripePay = Cookies.get("stripePay");
    if(!stripe||!stripePay){

    
    const localData = window.localStorage.getItem("client");
    const localReservation = window.localStorage.getItem("dataReservation");
  
    if (localData && localReservation) {
      const data = JSON.parse(localData);
      const datares = JSON.parse(localReservation);
      console.log(datares.arrPaquete);
  
      try {
        const response = await axios.post("http://localhost:3001/payment/checkout", {
          custumerId: data,
          arrIdHabitaciones: datares.arrHabitacion,
          arrIdPaquetes: datares.arrPaquete
        });
  
        const { payment, sessionId } = response.data;
        Cookies.set("stripe", sessionId, { expires: 1, secure: true });
        Cookies.set("stripePay", payment, { expires: 1, secure: true });
        window.location.href = payment;
      } catch (error) {
        console.error(error);
      }
    }
  }

     
      
      const paymentStatusResponse = await axios.post("http://localhost:3001/payment/status", { "sessionId":stripe });
        console.log(paymentStatusResponse.data);
      if (paymentStatusResponse.status === 200) {
        Cookies.remove('stripePay');
        Cookies.remove('stripe');
        if (reserva && reserva.length > 0) {
          const idReserva = reserva[0]._id;
          // Utiliza el valor de la propiedad según sea necesario
          console.log(idReserva);
          const reservaPaid = await axios.put(`http://localhost:3001/reservation/${idReserva}`,{"estado":"pagado"});
          console.log("Pago exitoso");
        }
        
      } if (paymentStatusResponse.status === 202){
        console.log("El pago no fue exitoso");
        //window.location.href = stripePay;
      }
    
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
              <button onClick={handlePayment} className={style.buttonpago} >Realizar Pago</button>
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
