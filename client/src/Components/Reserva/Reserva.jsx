import React, { useEffect, useState } from 'react';
import style from './Reserva.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getHabitacionesDisponibles } from '../redux/action';
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

  const usuario = useSelector(state => state.usuario);
  const rooms = useSelector(state => state.habitaciones);

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
      usuarioCorreo:usuario,
      arrHabitacion:selectedRoom,
      fechaInicio: dates.checkIn,
      fechaFin: dates.checkOut
  };
  
    if(usuario){
      fetch('http://localhost:3001/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
      // Manejar la respuesta del servidor
        if (response.ok) {
          console.log("quedo"); 
        }
      })
      .catch(error => {
        // Manejar errores
      });
    }else {
      window.sessionStorage.setItem("dataReservation", JSON.stringify(data));
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
      setSelectedRoom([...selectedRoom, activeRoom]);
      setPrecio(precio + activeRoom.precio);
    } else {
      setSelectedRoom(selectedRoom.filter(room => room._id !== value));
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
        <form onSubmit={handleSubmit}>

          <div className={style.formGroup}>
            <label htmlFor="check-in" className={style.label}>
              Fecha de entrada:
            </label>
            <input type="date" id="check-in" name="checkIn" value={dates.checkIn} onChange={handleDatesChange} className={style.input} required />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="check-out" className={style.label}>
              Fecha de salida:
            </label>
            <input type="date" id="check-out" name="checkOut" value={dates.checkOut} onChange={handleDatesChange} className={style.input} required />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="adults" className={style.label}>
              Adultos:
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
          </div>

          <div className={style.formGroup}>
            <label htmlFor="children" className={style.label}>
              Niños:
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
            <label htmlFor="precio" className={style.label}>
              Precio: ${precio}
            </label>
          </div>
          )}

          {adults !== 0 && rooms.length && (
            <div className={style.formGroup}>
              <label htmlFor="roomName" className={style.label}>
                Seleccione habitaciones:
              </label>
              <ul>
                {rooms.map((room) =>
                  (
                    <li key={room._id}>
                      <label>
                        <input
                          type="checkbox"
                          value={room._id}
                          checked={selectedRoom.some(activeRoom => activeRoom._id === room._id)}
                          onChange={handleRoomChange}
                        />
                        {room.disponible === false ? (
                          <span>
                            No disponible: {room.nombre}
                            <Link className={style.linkkk} to={`/habitacion/${room._id}`}>
                              <button className={style.hab}>Ver Habitación</button>
                            </Link>
                          </span>
                        ) : (
                          <span>
                            {room.nombre} Capacidad: {room.capacidad} Precio: ${room.precio}
                            <Link className={style.linkkk} to={`/habitacion${room.numero}`}>
                              <button className={style.hab}>Ver Habitación</button>
                            </Link>
                          </span>
                        )}
                      </label>
                    </li>
                  )
                )}
              </ul>
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
      </div>
    </div>
  );
}

export default Reserva;