
import React from "react";
import { Link } from "react-router-dom";
import style from "./Habitaciones.module.css";
import imagen from './habitacion.jpg';

import { connect } from 'react-redux';
import { setOrderByName, setOrderByCapacity, getHabitaciones } from '../redux/action';

const mapStateToProps = (state) => {
  return {
    orderByName: state.orderByName,
    orderByCapacity: state.orderByCapacity,
    habitaciones: state.gethabitaciones
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHabitaciones: () => dispatch(getHabitaciones()),
    setOrderByName: (orderType) => dispatch(setOrderByName(orderType)),
    setOrderByCapacity: (orderType) => dispatch(setOrderByCapacity(orderType))
  };
};

class Habitaciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      minPrice: 0,
      maxPrice: 0
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleMinPriceChange = (event) => {
    this.setState({ minPrice: parseInt(event.target.value)});
  };

  handleMaxPriceChange = (event) => {
    this.setState({ maxPrice: parseInt(event.target.value)});
  };

  componentDidMount() {
    this.props.getHabitaciones();
  };

  render() {
    let habitacionesFiltradas = this.props.habitaciones.slice();
    
    
    if (this.props.orderByName === 'asc') {
      habitacionesFiltradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.props.orderByName === 'desc') {
      habitacionesFiltradas.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    if (this.props.orderByCapacity === 'asc') {
      habitacionesFiltradas.sort((a, b) => a.capacidad - b.capacidad);
    } else if (this.props.orderByCapacity === 'desc') {
      habitacionesFiltradas.sort((a, b) => b.capacidad - a.capacidad);
    }

    if (this.state.searchQuery) {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) =>
        habitacion.nombre.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    }

    if (this.state.minPrice !== 0) {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) => 
        habitacion.precio >= this.state.minPrice
      )
    }

    if (this.state.maxPrice !== 0) {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) => 
        habitacion.precio <= this.state.maxPrice
      )
    }    

    let habitacionLinks = habitacionesFiltradas.map((habitacion, index) => (
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

        <input
          type="text"
          placeholder="Buscar habitaciones"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
          className={style.searchInput}
        />

        <input 
          type="number"
          placeholder="Precio mínimo"
          value={this.state.minPrice}
          onChange={this.handleMinPriceChange}
          className={style.searchInput}        
        />

        <input 
          type="number"
          placeholder="Precio máximo"
          value={this.state.maxPrice}
          onChange={this.handleMaxPriceChange}
          className={style.searchInput}
        />
        
        <div className={style.content}>
          <img src={imagen} alt="Habitación" className={style.image} />
          

          <h2 className={style.title}>Habitaciones</h2>
          
          <div className={style.links}>
            
            {habitacionLinks}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habitaciones);
