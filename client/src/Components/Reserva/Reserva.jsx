import React, { useEffect, useState } from 'react';
import style from './Reserva.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getHabitacionesDisponibles , getPaquetes,createReserva } from '../redux/action';
import axios from 'axios';


function Reserva() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [dates, setDates] = useState({checkIn:'', checkOut:''});
  const [precio, setPrecio] = useState(0);
  const [selectedPaquete, setSelectedPaquete] = useState([]);

  const usuario = useSelector(state => state.usuario);
  const rooms = useSelector(state => state.habitaciones);
  let paquetes = useSelector((state) => state.allpaquetes);

  useEffect(() => {
    dispatch(getPaquetes());
  }, [dispatch])

  useEffect( () => {
    if (dates.checkIn && dates.checkOut) {
      if (dates.checkIn > dates.checkOut) {
        alert('Error. La fecha de fin debe ser mayor a la de inicio');
        setDates({...dates, checkOut:''});
      }
      else{
        dispatch(getHabitacionesDisponibles(dates.checkIn,dates.checkOut))
      }
    }
  }, [dates]);

  useEffect( () => {
    let {data} = axios.get('http://localhost:3001/servicio');
    setServices(data);
  }, [])
  const handleAdultsChange = (e) => {
    setAdults(parseInt(e.target.value));
  };

  const handleChildrenChange = (e) => {
    setChildren(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      usuarioCorreo: usuario,      
      arrHabitacion:selectedRoom,
      arrServicio:[],
      arrPaquete:selectedPaquete,
      fechaInicio: dates.checkIn,
      fechaFin: dates.checkOut,
      costo:precio
    };
    window.localStorage.setItem("dataReservation", JSON.stringify(data));
  
    if(usuario){
      
      // fetch('http://localhost:3001/reservation', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      // .then(response => {
      // // Manejar la respuesta del servidor
      //   if (response.ok) {
      //     console.log("quedo"); 
      //   }

      createReserva(data).then((response) => {    
        console.log("response.data");                        
        console.log(response.data);
        window.localStorage.setItem("dataReservation", JSON.stringify(data));
      })
      .catch(error => {
        // Manejar errores
      });
    }else {
      window.localStorage.setItem("dataReservation", JSON.stringify(data));
      alert('Ingrese a su cuenta para continuar...')
      navigate("/contenedor");
    }
  };

  const handleDatesChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setDates({...dates, [property]:value});
  }

  const handleRoomChange = (e) => {
    const value = e.target.value;
    let activeRoom = rooms.find(room => room._id === value)
    if (e.target.checked) {
      //setSelectedRoom([...selectedRoom, activeRoom]);
      setSelectedRoom([...selectedRoom, value]);    
      setPrecio(precio + activeRoom.precio);
    } else {
      //setSelectedRoom(selectedRoom.filter(room => room._id !== value));
      setSelectedRoom(selectedRoom.filter(room => room !== value));     
      setPrecio(precio - activeRoom.precio);
    }   
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    let activeService = services.find(service => service._id === value);
    if (e.target.checked) {
      setSelectedService([...selectedService, activeService]);
      setPrecio(precio + activeService.precio);
    } else {
      setSelectedService(selectedService.filter(service => service._id !== value));
      setPrecio(precio - activeService.precio);
    }
  };
  const handlePaqueteChange = (e) => {
    const value = e.target.value;
    let activeRoom = paquetes.find(room => room._id === value)
    if (e.target.checked) {      
      setSelectedPaquete([...selectedPaquete, value]);     
      setPrecio(precio + activeRoom.costo);
    } else {      
      setSelectedPaquete(selectedPaquete.filter(room => room !== value));    
      setPrecio(precio - activeRoom.costo);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Return null to hide the component when it's not open
  }

  return (
    <div className={style.contenedor}>
      <div className={style.tamano}>
        <Link className={style.linkContainer} to="/">
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
        </Link>

        <h3 className={style.title}>Reserva tu estadía</h3>

        {/* <form onSubmit={handleSubmit} className={style.formContainer} >  */}
        <form onSubmit={handleSubmit}  >
          <div className="d-flex align-items-start bg-light mb-3" style={{ height: "30px" }}>
            <label htmlFor="check-in" className={style.label}>
              Fecha de entrada:&nbsp;&nbsp;&nbsp;
            </label>
            <input type="date" id="check-in" name="checkIn" value={dates.checkIn} onChange={handleDatesChange} className={style.inputFecha} required />
            <label htmlFor="check-in" className={style.label}>
              &nbsp;&nbsp;&nbsp;
            </label>
            <label htmlFor="check-in" className={style.label}>
              Fecha de salida:&nbsp;&nbsp;&nbsp;
            </label>
            <input type="date" id="check-out" name="checkOut" value={dates.checkOut} onChange={handleDatesChange} className={style.inputFecha} required />
            <label htmlFor="check-in" className={style.label}>
              &nbsp;&nbsp;&nbsp;
            </label>
            <label htmlFor="check-in" className={style.label}>
              Adultos:&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="number"
              id="adults"
              className={style.input}
              min="1"
              value={adults}
              onChange={handleAdultsChange}
              required
            />

            <label htmlFor="check-in" className={style.label}>
              &nbsp;&nbsp;&nbsp;
            </label>
            <label htmlFor="check-in" className={style.label}>
              Niños:&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="number"
              id="children"
              className={style.input}
              min="0"
              value={children}
              onChange={handleChildrenChange}
              required
            />

          </div>


          {precio !== 0 && (
            <div className={style.formGroup}>
              <label htmlFor="precio" className={style.precio}>
                Precio: ${precio}
              </label>
            </div>
          )}

          {adults !== 0 && rooms.length && (
            // puse estilo
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione la habitación:
              </label>
              <div className={style.containercheckbox}>
                {/* <ul> */}
                {rooms.map((room) =>
                (
                  // <li key={room._id}>
                  <label>
                    <input
                      type="checkbox"
                      value={room._id}
                      // checked={selectedRoom.some(activeRoom => activeRoom._id === room._id)}
                      onChange={handleRoomChange}
                    />
                    {room.disponible === false ? (
                      <span className={style.span}>
                        No disponible: {room.nombre}
                        <Link className={style.linkkk} to={`/habitacion/${room._id}`}>
                          <button className={style.hab}>Ver Habitación</button>
                        </Link> 
                       
                      </span>
                    ) : (
                      <span>
                        <br></br>
                        {room.nombre} Capacidad: {room.capacidad}<br></br> Precio: ${room.precio}
                        {/* <Link className={style.linkkk} to={`/habitacion/${room._id}`}>
                          <button className={style.hab}>Ver Habitación</button>
                        </Link> */}
                        <Link className={style.linkkk} to={`/habitacion${room.numero}`}>
                              <button className={style.hab}>Ver Habitación</button>
                        </Link>
                      </span>
                    )}
                  </label>
                  // </li>
                )
                )}
              </div>
              {/* </ul> */}
            </div>

          )}

          <br></br>
          {adults !== 0 && rooms.length && (
            
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione el paquete:
              </label>
              <div className={style.containercheckbox}>
                {/* <ul> */}
                {paquetes.map((room) =>
                (
                  // <li key={room._id}>
                  <label>
                    <input
                      type="checkbox"
                      value={room._id}
                      // checked={selectedPaquete.some(activeRoom => activeRoom._id === room._id)}
                      onChange={handlePaqueteChange}
                    />
                    {room.disponible === false ? (
                      <span>
                        No disponible: {room.nombre}
                        <Link className={style.linkkk} to={`/detail/${room._id}`}>
                          <button className={style.hab}>Ver Paquete</button>
                        </Link>
                      </span>
                    ) : (
                      <span>
                        {room.nombre} Capacidad: {room.capacidad}
                        <br></br>
                        {room.nombre} Precio: ${room.costo}
                        <Link className={style.linkkk} to={`/detail/${room._id}`}>
                          <button className={style.hab}>Ver Paquete</button>
                        </Link>
                      </span>
                    )}
                  </label>
                  // </li>
                )
                )}
                {/* </ul> */}
              </div>
            </div>

          )}
           {/* {adults !== 0 && services.length && (
            <div className={style.formGroup}>
              <label htmlFor="serviceName" className={style.label}>
                Seleccione servicios:
              </label>
              <ul>
                {services.map((service) =>
                  (
                    <li key={service._id}>
                      <label>
                        <input
                          type="checkbox"
                          value={service._id}
                          checked={selectedService.some(activeService => activeService._id === service._id)}
                          onChange={handleServiceChange}
                        />
                          <span>
                            {service.nombre}  Precio: ${service.precio}
                          </span>
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>
          )} */}
          <button type='submit' className={style.button}>Reservar ahora</button> 
                 
        </form>
        {/* <div className={style.spinner}></div>   */}
      </div>
    </div>
  );
}

export default Reserva;