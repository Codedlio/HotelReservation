import React, { useState } from 'react';
import style from './Reserva.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
  

function Reserva() {
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedRoom1, setSelectedRoom1] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [roomPrice, setRoomPrice] = useState('');
  const [email, setEmail] = useState('');



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
  const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const data = {
    adults,
    children,
    selectedRoom1,
    email,
    checkIn: e.target['check-in'].value,
    checkOut: e.target['check-out'].value,
  };
  console.log(data);

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
};

  const handleRoomChange = (e) => {
    const roomName = e.target.value;
    let roomId;
    let price;

    switch (roomName) {
      case 'Suite Roma (2 camas super King)':
        roomId = 1;
        price = "$290";
        break;
      case 'Suite Canell (1 cama super king)':
        roomId = 2;
        price = "$350";
        break;
      case 'Suite Licura (1 cama super king)':
        roomId = 3;
        price = "$290";
        break;
      case 'Villa Bosque (cama super king + 2 camas de 1 plaza)':
        roomId = 4;
        price = "$700";
        break;
      case 'Villa Rio (cama super king + 3 camas de 1 plaza)':
        roomId = 5;
        price = "$750";
        break;
        case 'Villa Arce (cama super king + 2 camas de 1 plaza)':
          roomId = 6;
          price = "$500";
          break;
          case 'Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)' :
            roomId = 7;
            price = "$550";
            break;
            case 'Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)':
              roomId = 8;
              price = "$550";
              break;
              case 'Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 9;
                price = "$600";
                break;
                case 'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 10;
                price = "$640";
                break;
                case 'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 11;
                price = "$640";
                break;
                case 'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 12;
                price = "$640";
                break;
                case 'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 13;
                price = "$695";
                break;
                case 'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)':
                roomId = 14;
                price = "$680";
                break;
      default:
        roomId = '';
      price = '';
      break;
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

    if (adults === 1) {
      return ["Suite Roma (2 camas super King)", "Suite Licura (1 cama super king)"];
    } else if (adults === 2 ) {
      return ["Suite Roma (2 camas super King)", "Suite Licura (1 cama super king)"];
      
    } else if (adults === 3 && children === 1 ) {
      return [
        
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        "Suite Canell (1 cama super king)"
      ];
    }else if (adults === 3  ) {
      return [
        
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        "Suite Canell (1 cama super king)"
      ];
    }else if (adults === 4 ) {
      return [
        
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        "Suite Canell (1 cama super king)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)',



        
      ];
    } 
    else if (adults === 2 && children === 2 ) {
      return [
        
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        "Suite Canell (1 cama super king)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)',
      ];
    }else if (adults === 1 && children === 3 ) {
      return [
        
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        "Suite Canell (1 cama super king)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)',
      ];
    }else if (adults === 4 && children === 1) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",,
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)'
      ];
    } else if (adults === 4 && children === 2) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)",
        
      ];
    } else if (adults === 4 && children === 3) {
      return [
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)"
      ];
    }else if (adults === 5 && children === 2) {
      return [
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)"
      ];
    }else if (adults === 6 && children === 1) {
      return [
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)"
      ];
    }else if (adults === 3 && children === 2) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)'

      ];
    }  else if (adults === 2 && children === 3) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)'
      ];
    }  else if (adults === 1 && children === 4) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)',
      ];
    } else if (adults === 5) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)",
        'Villa Lavanda (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Mosqueta (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Anacay (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Playa (cama 2 Plazas + 3 camas de 1 plaza)',
        'Villa Troncos (cama 2 Plazas + 3 camas de 1 plaza)'
      ];
    } else if (adults === 6) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)"
      ];
    }else if (adults === 7) {
      return [
        "Villa Arce (cama super king + 2 camas de 1 plaza)",
        "Villa Tilo (cama 2 Plazas + 3 camas de 1 plaza)",
        "Villa Cedra (cama 2 Plazas + 3 camas de 1 plaza)",
         "Villa Bosque (cama super king + 2 camas de 1 plaza)",
        "Villa Rio (cama super king + 3 camas de 1 plaza)",
        "Villa Madrid (cama 2 Plazas + 3 camas de 1 plaza)"
      ];
    } else if (total >7) {
      return [
        
      ];
    }else {
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
        <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
  <label htmlFor="email" className={style.label}>
    Correo electrónico:
  </label>
  <input
    type="email"
    id="email"
    className={style.input}
    value={email}
    onChange={handleEmailChange}
    required
  />
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
    <p className={style.price}>Precio: {roomPrice}</p>
  </Link>
)}

          <button type='submit' className={style.button}>Reservar ahora</button>
        </form>
      </div>
    </div>
  );
}

export default Reserva;