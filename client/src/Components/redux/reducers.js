// reducer.js
import { SET_ORDER_BY_NAME, SET_ORDER_BY_CAPACITY,GET_PAQUETES } from "./action";

const initialState = {
  orderByName: '',
  orderByCapacity: '',
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
  allpaquetes: [],
  orderPaquetes: [],
  filterPaquetes: []
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
      case GET_PAQUETES: return {
          ...state,
          allpaquetes: action.payload ,           
          orderPaquetes: action.payload,//aca lleno 
          filterPaquetes: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
