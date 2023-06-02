import React from "react";
import { Link } from "react-router-dom";
import style from "./Habitaciones.module.css";
import imagen from './habitacion.jpg';
import { connect } from 'react-redux';
import { setOrderByName } from '../redux/action';

const mapStateToProps = (state) => {
  return {
    orderByName: state.orderByName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderByName: (orderType) => dispatch(setOrderByName(orderType))
  };
};

class Habitaciones extends React.Component {
  render() {
    const habitaciones = [
      { nombre: 'Suite Roca' },
      { nombre: 'Suite Canelo' },
      { nombre: 'Suite Liucura' },
      { nombre: 'Villa Bosque' },
      { nombre: 'Villa Rio' },
      { nombre: 'Villa Arce' },
      { nombre: 'Villa Tilo' },
      { nombre: 'Villa Cedra' },
      { nombre: 'Villa Madrid' }
    ];

    // Filtrar y ordenar las habitaciones según el estado de ordenamiento
    let habitacionesFiltradas = habitaciones;
    if (this.props.orderByName === 'asc') {
      habitacionesFiltradas = habitacionesFiltradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.props.orderByName === 'desc') {
      habitacionesFiltradas = habitacionesFiltradas.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    // Renderizar las habitaciones filtradas
    const habitacionLinks = habitacionesFiltradas.map((habitacion, index) => (
      <Link to={`/habitacion${index + 1}`} className={style.link} key={index}>
        {habitacion.nombre}
      </Link>
    ));

    return (
      <div className={style.section}>
        <select className={style.linksordenamiento} onChange={(e) => this.props.setOrderByName(e.target.value)}>
          <option value="">Ordenar por Nombre</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select className={style.linksordenamiento}>
          <option value="">Order Capacidad</option>
          <option value="asc">Mayor</option>
          <option value="desc">Menor</option>
        </select>

        <div className={style.content}>
          <img src={imagen} alt="Habitación" className={style.image} />
          <div className={style.links}>
            <h2 className={style.title}>Habitaciones</h2>
            {habitacionLinks}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habitaciones);
