import React from "react";
import { Link } from "react-router-dom";
import style from "./Habitaciones.module.css";
import imagen from './habitacion.jpg';

function Habitaciones() {
  return (
    <div className={style.section}>
      <select className={style.linksordenamiento} >
          <option value="">Ordenar por Nombre</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>

        </select>
        <select className={style.linksordenamiento} >
          <option value="">Order Capacidad</option>
          <option value="asc">Mayor</option>
          <option value="desc">Menor</option>

        </select>
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
          <Link to="/habitacion6" className={style.link}>
            Villa Arce
          </Link>
          <Link to="/habitacion7" className={style.link}>
            Villa Tilo
          </Link>
          <Link to="/habitacion8" className={style.link}>
            Villa Cedra
          </Link>
          <Link to="/habitacion9" className={style.link}>
            Villa Madrid
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Habitaciones;
