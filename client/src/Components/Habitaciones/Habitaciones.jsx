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
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    let habitacionesFiltradas = this.props.habitacionesData.slice();

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

    // Filtrar habitaciones según el valor de búsqueda
    if (this.state.searchQuery) {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) =>
        habitacion.nombre.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    }

    // Renderizar los enlaces de las habitaciones filtradas
    const habitacionLinks = habitacionesFiltradas.map((habitacion, index) => (
      <Link to={`/habitacion${index + 1}`} className={`${style.link} + btn btn`} key={index}>
  {habitacion.nombre}
</Link>
    ));

    return (
      <div className={`container  ${style.section}`}>
    <div className="row">
      <div className="col-md-4">
        <div className="row">
          <div className="col-md-6">
            <select className={`form-select mb-3  ${style.linksordenamiento}`} value={this.props.orderByName} onChange={(e) => this.props.setOrderByName(e.target.value)}>
              <option value="">Ordenar por Nombre</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          <div className="col-md-6">
            <select className={`form-select mb-3  ${style.linksordenamiento}`} value={this.props.orderByCapacity} onChange={(e) => this.props.setOrderByCapacity(e.target.value)}>
              <option value="">Ordenar por Capacidad</option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-inline">
          <input
            type="text"
            placeholder="Busque habitacion"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            className={`form-control + ${style.searchInput}`}
          />
        </div>
      </div>
    </div>
        <div className="row">
        
          <div className="col-md-6">
            <h2 className={style.title}>Habitaciones</h2>
            <div className={style.links}>
              {habitacionLinks}
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
  <img src={imagen} alt="Habitación" className={`img-fluid mx-auto d-block mr-5  ${style.image}`} />
</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habitaciones)