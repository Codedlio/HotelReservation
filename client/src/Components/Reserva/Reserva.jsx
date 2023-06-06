import React, { useState } from 'react';
import style from './Reserva.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getHabitaciones } from '../redux/action';


function Reserva() {
  const navigate = useNavigate();
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedRoom1, setSelectedRoom1] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [roomPrice, setRoomPrice] = useState('');

  const usuario = useSelector(state => state.usuario);
  const getAllHabitaciones = useSelector(state => state.gethabitaciones);
  const dispatch=useDispatch()
 
  console.log(getAllHabitaciones);
    // Almacenar el hotel seleccionado en el almacenamiento local al cambiarlo
  useEffect(() => {
    localStorage.setItem('selectedRoom', selectedRoom);
  }, [selectedRoom]);

  // Obtener el hotel seleccionado del almacenamiento local al cargar el componente
  useEffect(() => {
    dispatch(getHabitaciones());
    const storedSelectedRoom = localStorage.getItem('selectedRoom');
    if (storedSelectedRoom) {
      setSelectedRoom(storedSelectedRoom);
    }
  }, []);
  useEffect(() => {
    const storedSelectedRoom1 = localStorage.getItem('selectedRoom1');
    if (storedSelectedRoom1) {
      setSelectedRoom1(storedSelectedRoom1);
    }
  }, []);



  const handleAdultsChange = (e) => {
    setAdults(parseInt(e.target.value));
  };


  const handleChildrenChange = (e) => {
    setChildren(parseInt(e.target.value));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  
  const data = {
    usuario:usuario,
    usuarioCorreo:getAllHabitaciones.correo,
    arrHabitacion:[selectedRoom],
    fechaInicio: e.target['check-in'].value,
    fechaFin: e.target['check-out'].value
  };
  //console.log(data);
    if (data.fechaInicio>data.fechaFin) {
    alert('La fecha de salida debe ser posterior a la fecha de entrada');
    data.fechaFin= ""
  
  }else{
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
  }
  

  
};

  const handleRoomChange = (e) => {
    const roomName = e.target.value;
    let roomId;
    let price;
    const habitacion = getAllHabitaciones.find(h => roomName.includes(h.nombre));
   
    if (habitacion) {
      roomId = habitacion._id;
      price = habitacion.precio;
    }
  
    setSelectedRoom(roomId);
    setSelectedRoom1(roomName); 
    setRoomPrice(price);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Return null to hide the component when it's not open
  }

  const getAvailableRooms = (adults, children) => {
    const total = adults + children;
  
    const rooms = [
      { name: "Suite Roma (2 camas super King)", capacidad: 2 },
      { name: "Suite Liucura (1 cama super king)", capacidad: 2 },
      { name: "Villa Arce (cama super king + 2 camas de 1 plaza)", capacidad: 4 },
      { name: "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 5 },
      { name: "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 5 },
      { name: "Suite Canelo (1 cama super king)", capacidad: 3 },
      { name: "Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 4},
      { name: "Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 5 },
      { name: "Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 5 },
      { name: "Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 5 },
      { name: "Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 5 },
      { name: "Villa Bosque (cama super king + 2 camas de 1 plaza)", capacidad: 6 },
      { name: "Villa Rio (cama super king + 3 camas de 1 plaza)", capacidad: 7 },
      { name: "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)", capacidad: 7 }
    ];
  
 
    return rooms
    .filter(room => room.capacidad >= total && room.capacidad <= total +1)
    .map(room => room.name);
};

  const availableRooms = getAvailableRooms(adults, children);

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
</div>

          <div className={style.formGroup}>
            <label htmlFor="check-in" className={style.label}>
              Fecha de entrada:
            </label>
            <input type="date" id="check-in" className={style.input} required />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="check-out" className={style.label}>
              Fecha de salida:
            </label>
            <input type="date" id="check-out" className={style.input} required />
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
          {adults !== '' && (
            <div className={style.formGroup}>
              <label htmlFor="roomName" className={style.label}>
                Seleccione una habitación:
              </label>
              <select
                id="roomName"
                className={style.input}
                value={selectedRoom1}
                onChange={handleRoomChange}
                required
              >
                <option value="">Seleccione una habitación</option>
                {availableRooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          )}
         {selectedRoom !== '' && (
  <Link className={style.linkkk} to={`/habitacion${selectedRoom}`}>
    <button className={style.hab}>Ver Habitación</button>
    <h5 className={style.price}>Precio:${roomPrice}</h5>
  </Link>
)}

          <button type='submit' className={style.button}>Reservar ahora</button>
        </form>
      </div>
    </div>
  );
}

export default Reserva;