import React from "react";
import { Link } from "react-router-dom";
import style from "./Habitaciones.module.css";
import imagen from './habitacion.jpg';
import { connect } from 'react-redux';
import { setOrderByName, setOrderByCapacity } from '../redux/action';

const mapStateToProps = (state) => {
  return {
    orderByName: state.orderByName,
    orderByCapacity: state.orderByCapacity,
    habitacionesData: state.habitacionesData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderByName: (orderType) => dispatch(setOrderByName(orderType)),
    setOrderByCapacity: (orderType) => dispatch(setOrderByCapacity(orderType))
  };
};

class Habitaciones extends React.Component {
  render() {
    const habitacionesFiltradas = this.props.habitacionesData.slice();
    
    // Filtrar y ordenar las habitaciones según el estado de ordenamiento por nombre
    if (this.props.orderByName === 'asc') {
      habitacionesFiltradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.props.orderByName === 'desc') {
      habitacionesFiltradas.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    // Filtrar y ordenar las habitaciones según el estado de ordenamiento por capacidad
    if (this.props.orderByCapacity === 'asc') {
      habitacionesFiltradas.sort((a, b) => a.capacidad - b.capacidad);
    } else if (this.props.orderByCapacity === 'desc') {
      habitacionesFiltradas.sort((a, b) => b.capacidad - a.capacidad);
    }

    // Renderizar los enlaces de las habitaciones filtradas
    const habitacionLinks = habitacionesFiltradas.map((habitacion, index) => (
      <Link to={`/habitacion${index + 1}`} className={style.link} key={index}>
        {habitacion.nombre}
      </Link>
    ));

    return (
      <div className={style.section}>
        <select className={style.linksordenamiento} value={this.props.orderByName} onChange={(e) => this.props.setOrderByName(e.target.value)}>
          <option value="">Ordenar por Nombre</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select className={style.linksordenamiento} value={this.props.orderByCapacity} onChange={(e) => this.props.setOrderByCapacity(e.target.value)}>
          <option value="">Ordenar por Capacidad</option>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
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
