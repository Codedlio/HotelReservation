// reducer.js
import { SET_ORDER_BY_NAME, SET_ORDER_BY_CAPACITY, SET_ORDER_BY_PRICE } from "./action";

const initialState = {
  orderByName: '',
  orderByCapacity: '',
  orderByPrice: '',
  habitaciones: [
    { nombre: 'Suite Roca'},
    { nombre: 'Suite Canelo' },
    { nombre: 'Suite Liucura'},
    { nombre: 'Villa Bosque' },
    { nombre: 'Villa Rio'},
    { nombre: 'Villa Arce' },
    { nombre: 'Villa Tilo' },
    { nombre: 'Villa Cedra' },
    { nombre: 'Villa Madrid' }
  ],
  habitacionesData: [
    { nombre: 'Suite Roca', capacidad: 2 },
    { nombre: 'Suite Canelo', capacidad: 4 },
    { nombre: 'Suite Liucura', capacidad: 2 },
    { nombre: 'Villa Bosque', capacidad: 7 },
    { nombre: 'Villa Rio', capacidad: 7 },
    { nombre: 'Villa Arce', capacidad: 6 },
    { nombre: 'Villa Tilo', capacidad: 6 },
    { nombre: 'Villa Cedra', capacidad: 6 },
    { nombre: 'Villa Madrid', capacidad: 7 }
  ],
  habitacionesPrecio: [
    { nombre: 'Suite Roca', Precio: 290 },
    { nombre: 'Suite Canelo', Precio: 350 },
    { nombre: 'Suite Liucura', Precio: 290 },
    { nombre: 'Villa Bosque', Precio: 700 },
    { nombre: 'Villa Rio', Precio: 750 },
    { nombre: 'Villa Arce', Precio: 500 },
    { nombre: 'Villa Tilo', Precio: 550 },
    { nombre: 'Villa Cedra', Precio: 550 },
    { nombre: 'Villa Madrid', Precio: 600 },
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BY_NAME:
      let sortedArrByName;
      if (action.payload === 'asc') {
        sortedArrByName = state.habitaciones
          .slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (action.payload === 'desc') {
        sortedArrByName = state.habitaciones
          .slice()
          .sort((a, b) => b.nombre.localeCompare(a.nombre));
      } else {
        sortedArrByName = state.habitaciones;
      }
      return {
        ...state,
        orderByName: action.payload,
        habitaciones: sortedArrByName
      };

    case SET_ORDER_BY_CAPACITY:
      let sortedArrByCapacity;
      if (action.payload === 'asc') {
        sortedArrByCapacity = state.habitacionesData
          .slice()
          .sort((a, b) => a.capacidad - b.capacidad);
      } else if (action.payload === 'desc') {
        sortedArrByCapacity = state.habitacionesData
          .slice()
          .sort((a, b) => b.capacidad - a.capacidad);
      } else {
        sortedArrByCapacity = state.habitacionesData;
      }
      return {
        ...state,
        orderByCapacity: action.payload,
        habitacionesData: sortedArrByCapacity
      };
      case SET_ORDER_BY_PRICE:
        let sortedArrByPrice;
        if (action.payload === 'asc') {
          sortedArrByPrice = state.habitacionesPrecio
            .slice()
            .sort((a, b) => a.Precio - b.Precio);
        } else if (action.payload === 'desc') {
          sortedArrByPrice = state.habitacionesPrecio
            .slice()
            .sort((a, b) => b.Precio - a.Precio);
        } else {
          sortedArrByPrice = state.habitacionesPrecio;
        }
        return {
          ...state,
          orderByPrice: action.payload,
          habitacionesPrecio: sortedArrByPrice
        };

    default:
      return state;
  }
};

export default reducer;
