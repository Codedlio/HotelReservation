import React, { useState } from 'react';
import style from './Reserva.module.css';
import { Link } from 'react-router-dom';

function Reserva() {
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isOpen, setIsOpen] = useState(true);

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
      case 'Suite Roma':
        roomId = 1;
        break;
      case 'Suite Canell':
        roomId = 2;
        break;
      case 'Suite Licura':
        roomId = 3;
        break;
      case 'Villa Bosque':
        roomId = 4;
        break;
      case 'Villa Rio':
        roomId = 5;
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
      return ["Suite Canell", "Suite Licura"];
    } else if (adults === 2 && children === 0) {
      return ["Suite Canelo", "Suite Licura"];
    } else if (adults === 3 && children === 0) {
      return ["Suite Roma", "Villa Bosque", "Villa Rio"];
    } else if (adults === 2 && children >= 1) {
      return ["Suite Roma", "Villa Bosque", "Villa Rio"];
    } else if (adults === 4 && children === 0) {
      return ["Suite Roma", "Villa Bosque", "Villa Rio"];
    } else if (adults >= 2 && total <= 7) {
      return ["Villa Bosque", "Villa Rio"];
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
