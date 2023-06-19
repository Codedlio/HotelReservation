import React ,  { useEffect, useState }from 'react';
import style from './DetalleReserva.module.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {getReservaByUsuario, ClearAllCarrito} from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import Carousel from "react-bootstrap/Carousel";

function DetalleReserva() {
  const emailToken = Cookies.get('emailToken');
  const usuario = useSelector(state => state.usuario);
  const dispatch = useDispatch();
  let reserva = useSelector((state) => state.reserva);
  const [index, setIndex] = useState(0);
  useEffect(() => { 
    if (emailToken)    
        dispatch(getReservaByUsuario(emailToken));
  }, [dispatch])
  console.log(reserva[0]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };
  const handleClearAllCarrito = (event) => {
    event.preventDefault();
    dispatch(ClearAllCarrito("clear"));
    window.localStorage.setItem("dataReservation", []);
};
  const handlePayment = async () => {
    const stripe = Cookies.get("stripe");
    const stripePay = Cookies.get("stripePay");
    if(!stripe||!stripePay){

    
    const localData = window.localStorage.getItem("client");
    const localReservation = window.localStorage.getItem("dataReservation");
  
    if (localData && reserva) {
      const data = JSON.parse(localData);
      const datares = JSON.parse(localReservation);
      console.log(reserva);
      const habitaciones=reserva[0].Arrayhabitaciones
      const paquetes=reserva[0].Arraypaquete
      try {
        const response = await axios.post("http://localhost:3001/payment/checkout", {
          "custumerId": data,
          "arrIdHabitaciones": habitaciones,
          "arrIdPaquetes": paquetes
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
      // if (paymentStatusResponse.status === 200) {
        
      //   if (reserva && reserva.length > 0) {
      //     const idReserva = reserva[0]._id;
      //     // Utiliza el valor de la propiedad según sea necesario
      //     console.log(idReserva);
      //     const reservaPaid = await axios.put("http://localhost:3001/reservation/648a8076676a594553f1ee9f",{"estado":"pagado"});
      //     console.log(reservaPaid.data);
      //     Cookies.remove('stripePay');
      //     Cookies.remove('stripe');
      //   }
        
      // } 
      if (paymentStatusResponse.status === 202){
        console.log("El pago no fue exitoso");
        window.location.href = stripePay;
      }
  };
  
  const renderDetailHabiReserva = (habi) => {
    if (Array.isArray(habi)) {
      return habi?.map((h) => {
        return (
          <div className={style.dataContainer} key={h._id}>
           
            {/* {h && h.label && <p className={style.label}>Id de tu producto: {h.label}</p>} */}

            {/* <p className={style.label2}>${h._id}</p> */}
            <p className={style.label}>Habitación: {h.nombre}</p>
            <p className={style.label2}>${h.capacidad}</p>
            <p className={style.label}>Precio de la Habitación: ${h.precio}</p>
          </div>
        );
      });
    }
  };
  
    const renderDetailPaqReserva = (habi) => {
      if (Array.isArray(habi)) {
        return habi?.map((h) => {
          return (
            <div className={style.encierro} key={h._id}>
              
              {/* <p className={style.label}>Id de tu producto:  </p>
              <p className={style.label2}>${h._id}</p>   */}
              <p className={style.label}>Paquete:  </p>
              <p className={style.label2}>${h.nombre}</p>    
              <p className={style.encierro}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              
              <p className={style.label}>Precio del Paquete: </p>
              <p className={style.label2}>${h.precio}</p>    
                 
                
             
            </div>
          );
        });
      }
    };
  
    const renderDetailServReserva = (habi) => {
      if (Array.isArray(habi)) {
        return habi?.map((h) => {
          return (
            <div className={style.encierro} key={h._id}>
           
             {/* <p className={style.label}>Id de tu producto:</p> */}
              {/* <p className={style.label2}>${h._id}</p>    */}
              <p className={style.label}>Servicio:</p>
              <p className={style.label2}>${h.nombre}</p>   
              <p className={style.label}>Precio del Servicio:</p>
              <p className={style.label2}>${h.precio}</p>   
            </div>
          );
        });
      }
    };
  
    if (Array.isArray(reserva)) {
      if (reserva.length > 0) {
        console.log("mayor a cero");
        console.log(reserva.length);
        return reserva.map((re) => {
          return (
            
              <div className="wholeCart">
                <div className={style.encierro}>
                 
                  <button className={style.bottoncerrar} onClick={handleClearAllCarrito}>
                    Borrar todo
                  </button>
                </div>
                <div className={style.titleCartContainer}>
                <h1 className={style.tit}>SU RESERVA</h1>
               
                {re.Arrayhabitaciones && <div>{renderDetailHabiReserva(re.Arrayhabitaciones)}</div>}
                {re.Arrayhabitaciones && re.Arraypaquete && <div>{renderDetailPaqReserva(re.Arraypaquete)}</div>}

                {re.Arrayhabitaciones && <div>{renderDetailServReserva(re.ArrayServicio)}</div>}
                <div className="totals">
                  {/* <p className={style.style.label}>Total Compra:</p> */}
                  <p className={style.label}>Total Compra:</p>
                  <p className={style.label2}>${re.costo}</p>
                </div>
              </div>
              <div className={style.ContainerButton}>
              <button onClick={handlePayment} className={style.buttonpago} >Realizar Pago</button>
              </div>
            </div>
          );
        });
      } else {
        return (
          <div className={style.CartContainerVacio}>
            <div className={style.ContainerButton}>
            <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} onClick={handleClose}>
            X
          </button>
        </Link>        
       
            </div>
            <div className={style.titleCartContainerVacio}>
              <h3>Tu carrito de Compras esta vacío :(</h3>
            </div>
          </div>
        );
      }
    }
  
  

  return (
    // <div className={style.container}>
    <div >
      <div className={style.Body}>
        {/* <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} onClick={handleClose}>
            X
          </button>
        </Link>         */}
      <NavBar></NavBar>
      <div >{renderDetailServReserva()}</div>
      <FooterBar />
      </div>
    </div>
  );
};

export default DetalleReserva;
