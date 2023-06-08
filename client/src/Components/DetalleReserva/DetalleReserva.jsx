import React from 'react';
import style from './DetalleReserva.module.css';
import { Link } from 'react-router-dom';

function DetalleReserva() {
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };

  return (
    <div className={style.container}>
      <div className={style.contenedor}>
        <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} onClick={handleClose}>
            X
          </button>
        </Link>
        <div className={style.encierro}>
          <h1 className={style.tit}>SU RESERVA</h1>
          <p className={style.label}>Fecha de entrada:</p>
          <p className={style.label2}>Ejemplo: 1 de julio</p>
          <p className={style.label}>Fecha de salida:</p>
          <p className={style.label2}>Ejemplo: 3 de julio</p>
          <p className={style.label}>Adultos:</p>
          <p className={style.label2}>Ejemplo: 2</p>
          <p className={style.label}>Niños:</p>
          <p className={style.label2}>Ejemplo: 4</p>
          <p className={style.label}>Habitación:</p>
          <p className={style.label2}>Ejemplo: Suite Roma</p>
          <p className={style.label}>Precio:</p>
          <p className={style.label2}>Ejemplo: $260</p>
        </div>
      </div>
    </div>
  );
}

export default DetalleReserva;
