// reducer.js
import { SET_ORDER_BY_NAME } from "./action";
const initialState = {
    orderByName: '', // Estado inicial del ordenamiento por nombre
    habitaciones: [] // Array de habitaciones
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ORDER_BY_NAME:
        let sortedArr;
        if (action.payload === 'asc') {
          sortedArr = state.habitaciones.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (action.payload === 'desc') {
          sortedArr = state.habitaciones.slice().sort((a, b) => b.nombre.localeCompare(a.nombre));
        } else {
          sortedArr = state.habitaciones;
        }
        return {
          ...state,
          orderByName: action.payload,
          habitaciones: sortedArr
        };
      case 'SET_HABITACIONES':
        return {
          ...state,
          habitaciones: action.payload
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  