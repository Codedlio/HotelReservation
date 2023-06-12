import React, { useEffect, useState } from 'react';
import style from './Reserva.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getHabitacionesDisponibles , getPaquetes,createReserva, getPaqueteById } from '../redux/action';
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
  const paquetes = useSelector((state) => state.allpaquetes);

  useEffect(() => {
    dispatch(getPaquetes());
    console.log(paquetes);
    console.log(rooms);
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
    axios.get('http://localhost:3001/servicio')
      .then((response) => {setServices(response.data)})
      .catch((error) => {alert(error.message)});
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
    
  
    if(usuario){
      createReserva(data).then((response) => {    
        console.log("response.data");                        
        console.log(response.data);
        alert(response.data);  
      })
      .catch(error => {
        alert(error.message)
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
      setSelectedRoom([...selectedRoom, value]);    
      setPrecio(precio + activeRoom.precio);
    } else {
      setSelectedRoom(selectedRoom.filter(room => room !== value));     
      setPrecio(precio - activeRoom.precio);
    }   
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    let activeService = services.find(service => service._id === value);
    if (e.target.checked) {
      setSelectedService([...selectedService, value]);
      setPrecio(precio + activeService.precio);
    } else {
      setSelectedService(selectedService.filter(service => service !== value));
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
              <label htmlFor="precio" className={style.label}>
                Precio: ${precio}
              </label>
              <br/>
              {selectedRoom.length > 0 && (
                <><label className={style.label}>
                  Habitacion/es seleccionada/s:&nbsp;
                  {selectedRoom.map(roomId => {
                    const habitacion = rooms.find(room => room._id === roomId);
                    if (habitacion) {
                      return habitacion.nombre;
                    }
                  }).join(', ')}
                </label>
                <br/></>
              )} 
              {selectedPaquete.length > 0 && (
                <><label className={style.label}>
                  Paquete/s seleccionado/s:&nbsp;
                  {selectedPaquete.map(paqueteId => {
                    const paq = paquetes.find(pa => pa._id === paqueteId);
                    if (paq) {
                      return paq.nombre;
                    }
                  }).join(', ')}
                </label>
                <br/></>
              )}
              {selectedService.length > 0 && (
                <><label className={style.label}>
                  Servicio/s seleccionado/s:&nbsp;
                  {selectedService.map(servicioId => {
                    const ser = services.find(se => se._id === servicioId);
                    if (ser) {
                      return ser.nombre;
                    }
                  }).join(', ')}
                </label>
                <br/></>
              )}  
            </div>
          )}
          <br></br>
          {adults !== 0 && rooms.length && (
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione la habitación:
              </label>
              <div className={style.containercheckbox}>
                {rooms.map((room) =>
                  <label key={room._id}>
                  {room.disponible === false ? (
                    <>
                      <input
                        type="checkbox"
                        disabled
                        value={room._id}
                        onChange={handleRoomChange}
                      />
                        <span>
                          No disponible: {room.nombre}
                          <Link className={style.linkkk} to={`/habitacion/${room._id}`}>
                            <button className={style.hab}>Ver Habitación</button>
                          </Link> 
                        </span>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        value={room._id}
                        onChange={handleRoomChange}
                      />
                      <span>
                        <br></br>
                        {room.nombre} Capacidad: {room.capacidad}<br></br> Precio: ${room.precio}
                        <Link className={style.linkkk} to={`/habitacion${room.numero}`}>
                              <button className={style.hab}>Ver Habitación</button>
                        </Link>
                      </span>
                    </>
                  )} 
                  </label>
                )}
              </div>
            </div>
          )}

          <br></br>

          {adults !== 0 && paquetes.length && (  
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione el paquete:
              </label>
              <div className={style.containercheckbox}>
                {paquetes.map((paquete) =>
                  <label key={paquete._id}>
                    {paquete.disponible === false ? (
                      <>
                      <input
                        disabled
                        type="checkbox"
                        value={paquete._id}
                        onChange={handlePaqueteChange}
                      />
                      <span>
                        No disponible: {paquete.nombre}
                        <Link className={style.linkkk} to={`/detail/${paquete._id}`}>
                          <button className={style.hab}>Ver Paquete</button>
                        </Link>
                      </span>
                      </>
                    ) : (
                      <>
                      <input
                        type="checkbox"
                        value={paquete._id}
                        onChange={handlePaqueteChange}
                      />
                      <span>
                        {paquete.nombre} Capacidad: {paquete.capacidad}
                        <br></br>
                        Precio: ${paquete.costo}
                        <Link className={style.linkkk} to={`/detail/${paquete._id}`}>
                          <button className={style.hab}>Ver Paquete</button>
                        </Link>
                      </span>
                      </>
                    )}
                  </label>
                )}
              </div>
            </div>
          )}

          <br></br>

          {adults !== 0 && services.length && (  
            <div >
              <label htmlFor="roomName" className={style.label}>
                Seleccione el servicio:
              </label>
              <div className={style.containercheckbox}>
                {services.map((servicio) =>
                  <label key={servicio._id}>
                      <input
                        type="checkbox"
                        value={servicio._id}
                        onChange={handleServiceChange}
                      />
                      <span>
                        {servicio.nombre} 
                        <br></br>
                        Precio: ${servicio.precio}
                      </span>
                  </label>
                )}
              </div>
            </div>
          )}
          <br/>
          <button type='submit' className={style.button}>Reservar ahora</button>          
        </form>
      </div>
    </div>
  );
}

export default Reserva;