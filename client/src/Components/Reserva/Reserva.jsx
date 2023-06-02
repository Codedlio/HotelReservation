import React, { useState } from 'react';
import style from './Reserva.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Reserva() {
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isOpen, setIsOpen] = useState(true);

    // Almacenar el hotel seleccionado en el almacenamiento local al cambiarlo
  useEffect(() => {
    localStorage.setItem('selectedRoom', selectedRoom);
  }, [selectedRoom]);

  // Obtener el hotel seleccionado del almacenamiento local al cargar el componente
  useEffect(() => {
    const storedSelectedRoom = localStorage.getItem('selectedRoom');
    if (storedSelectedRoom) {
      setSelectedRoom(storedSelectedRoom);
    }
  }, []);

  const handleAdultsChange = (e) => {
    setAdults(parseInt(e.target.value));
  };

  const handleChildrenChange = (e) => {
    setChildren(parseInt(e.target.value));
  };

  const handleRoomChange = (e) => {
    const roomName = e.target.value;
    let roomId;

    switch (roomName) {
      case 'Suite Roma (2 camas super King)':
        roomId = 1;
        break;
      case 'Suite Canell (1 cama super king)':
        roomId = 2;
        break;
      case 'Suite Licura (1 cama super king)':
        roomId = 3;
        break;
      case 'Villa Bosque (cama super king + 2 camas de 1 plaza)':
        roomId = 4;
        break;
      case 'Villa Rio (cama super king + 3 camas de 1 plaza)':
        roomId = 5;
        break;
        case 'Villa Arce (cama super king + 2 camas de 1 plaza)':
          roomId = 6;
          break;
          case 'Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)' :
            roomId = 7;
            break;
            case 'Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)':
              roomId = 8;
              break;
              case 'Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 9;
                break;
      default:
        roomId = '';
        break;
    }

    setSelectedRoom(roomId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Return null to hide the component when it's not open
  }

  const getAvailableRooms = (adults, children) => {
    const total = adults + children;

    if (adults === 1) {
      return ["Suite Canell (1 cama super king)", "Suite Licura (1 cama super king)"];
    } else if (adults === 2 && children === 0) {
      return ["Suite Canelo (1 cama super king)", "Suite Licura (1 cama super king)"];
    } else if (adults === 3 && children === 0) {
      return ["Suite Roma (2 camas super King)", "Villa Bosque (cama super king + 2 camas de 1 plaza)", "Villa Rio (cama super king + 3 camas de 1 plaza)"];
    } else if (adults === 2 && children >= 1) {
      return ["Suite Roma (2 camas super King)", "Villa Bosque (cama super king + 2 camas de 1 plaza)", "Villa Rio (cama super king + 3 camas de 1 plaza)","Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)","Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)", "Villa Madrid (cama 2 Plazas, 3 camas 1 plaza", "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)", "Villa Arce (cama super king + 2 camas de 1 plaza)"];
    } else if (adults === 4 && children === 0) {
      return ["Suite Roma (2 camas super King)", "Villa Bosque (cama super king + 2 camas de 1 plaza)", "Villa Rio"];
    } else if (adults >= 2 && total <= 7) {
      return ["Villa Bosque (cama super king + 2 camas de 1 plaza)", "Villa Rio (cama super king + 3 camas de 1 plaza)","Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)", "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)", "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)", "Villa Arce (cama super king + 2 camas de 1 plaza)"];
    } else {
      return [];
    }
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
        <form>
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
                value={selectedRoom}
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
            <Link to={`/habitacion${selectedRoom}`}>
              <button className={style.hab}>Ver Habitación</button>
            </Link>
          )}
          <button className={style.button}>Reservar ahora</button>
        </form>
      </div>
    </div>
  );
}

export default Reserva;
