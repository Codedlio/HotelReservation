import React from 'react';
import style from './Reserva.module.css';
import { Link } from 'react-router-dom';

function Reserva() {
  return (
    <div className={style.contenedor}>
      <div className={style.tamano}>
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
          <label htmlFor="guests" className={style.label}>
            Cantidad de huéspedes:
          </label>
          <input type="number" id="guests" className={style.input} min="1" required />
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
