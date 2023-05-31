import React, { useState } from 'react';
import style from './Reserva.module.css';
import { Link } from 'react-router-dom';


function Reserva() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handleAdultsChange = (e) => {
    setAdults(parseInt(e.target.value));
  };

  const handleChildrenChange = (e) => {
    setChildren(parseInt(e.target.value));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Retorna null para ocultar el componente cuando no está abierto
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
          <button className={style.button}>
            Reservar ahora
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reserva;
