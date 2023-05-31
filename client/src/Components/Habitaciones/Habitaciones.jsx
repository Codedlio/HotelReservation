import React from "react";
import { Link } from "react-router-dom";
import style from "./Habitaciones.module.css";
import imagen from './habitacion.jpg';

function Habitaciones() {
  return (
    <div className={style.section}>
      <div className={style.content}>
        <img src={imagen} alt="Habitación" className={style.image} />
        <div className={style.links}>
          <h2 className={style.title}>Habitaciones</h2>
          <Link to="/habitacion1" className={style.link}>
            Suite Roca
          </Link>
          <Link to="/habitacion2" className={style.link}>
            Suite Canelo
          </Link>
          <Link to="/habitacion3" className={style.link}>
            Suite Liucura
          </Link>
          <Link to="/habitacion4" className={style.link}>
            Villa Bosque
          </Link>
          <Link to="/habitacion5" className={style.link}>
            Villa Rio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Habitaciones;
