// reducer.js

import { SET_ORDER_BY_NAME, SET_ORDER_BY_CAPACITY, SET_ORDER_BY_PRICE, GET_PAQUETES, SET_CURRENT_PAGE, SET_USUARIO, SUGERENCIA_EMAIL, DELETE_USUARIO, GET_HABITACIONES, GET_HABITACIONES_DISPONIBLES, ORDER_PAQUETES, GET_PAQUETES_BY_ID, GET_RESERVA_BY_USER, FILTER_NAME_PAQUETE } from "./action";

const initialState = {
  orderByName: '',
  orderByCapacity: '',
  orderByPrice: '',
  habitacionesData: [
    { nombre: 'Suite Roca', capacidad: 2 },
    { nombre: 'Suite Canelo', capacidad: 4 },
    { nombre: 'Suite Liucura', capacidad: 2 },
    { nombre: 'Villa Bosque', capacidad: 7 },
    { nombre: 'Villa Rio', capacidad: 7 },
    { nombre: 'Villa Arce', capacidad: 6 },
    { nombre: 'Villa Tilo', capacidad: 6 },
    { nombre: 'Villa Cedra', capacidad: 6 },
    { nombre: 'Villa Madrid', capacidad: 7 },
    { nombre: 'Villa Lavanda', capacidad: 5 },
    { nombre: 'Villa Mosqueta', capacidad: 5 },
    { nombre: 'Villa Anacay', capacidad: 5 },
    { nombre: 'Villa Playa', capacidad: 5 },
    { nombre: 'Villa Troncos', capacidad: 5 },
  ],
  allpaquetes: [],
  orderPaquetes: [],
  filterPaquetes: [],
  set_Current_Page: [],
  usuario: undefined,
  gethabitaciones: [],
  habitaciones: [],
  paqueteXid: [],
  reserva: []
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    // case SET_ORDER_BY_PRICE:
    //   let sortedArrByPrice;
    //   if (action.payload === 'asc') {
    //     sortedArrByPrice = state.habitacionesPrecio
    //       .slice()
    //       .sort((a, b) => a.Precio - b.Precio);
    //   } else if (action.payload === 'desc') {
    //     sortedArrByPrice = state.habitacionesPrecio
    //       .slice()
    //       .sort((a, b) => b.Precio - a.Precio);
    //   } else {
    //     sortedArrByPrice = state.habitacionesPrecio;
    //   }
    //   return {
    //     ...state,
    //     orderByPrice: action.payload,
    //     habitacionesPrecio: sortedArrByPrice
    //   };
    case GET_PAQUETES: return {
      ...state,
      allpaquetes: action.payload,
      orderPaquetes: action.payload,//aca lleno 
      filterPaquetes: action.payload
    }
    case GET_PAQUETES_BY_ID: return {
      ...state,
      paqueteXid: action.payload
    }
    case ORDER_PAQUETES:
      console.log("ORDER_PAQUETES-action.payload");
      console.log(action.payload);
      const Paquetes = [...state.allpaquetes];
      const SortPaquetes = (action.payload === 'asc' ? Paquetes.sort((a, b) => a.nombre.localeCompare(b.nombre))
        : (action.payload === 'desc') ? Paquetes.sort((a, b) => b.nombre.localeCompare(a.nombre))
          : (action.payload === 'costoAsc') ? Paquetes.sort((a, b) => a.costo - b.costo)
            : (action.payload === 'costoDesc') ? Paquetes.sort((c1, c2) => {
              if (c1.costo < c2.costo) return 1;
              if (c1.costo > c2.costo) return -1;
              return 0;
            }) : Paquetes)
      return {
        ...state,
        orderPaquetes: SortPaquetes
      }
      case FILTER_NAME_PAQUETE:
        console.log("FILTER_NAME-action.payload");
        console.log(action.payload);
        const FilName = [...state.filterPaquetes];
        const FilPaquet = (action.payload === '' ? FilName
            : FilName.filter((paquete) => {
                return paquete.nombre.toUpperCase().includes(action.payload.toUpperCase());
            }))

        return {
            ...state,
            //filterGames: Filter 
            orderPaquetes: FilPaquet
        }



    case GET_RESERVA_BY_USER: return {
      ...state,
      reserva: action.payload
    }

    case SET_USUARIO: return {
      ...state,
      usuario: action.payload
    }
    case GET_HABITACIONES:
      return {
        ...state,
        gethabitaciones: action.payload
      }
    case DELETE_USUARIO: return {
      ...state,
      usuario: undefined
    }
    case GET_HABITACIONES_DISPONIBLES: return {
      ...state,
      habitaciones: action.payload
    }
    case SUGERENCIA_EMAIL:
      if (action.payload.status === 200) {
        return {
          ...state,
        }
      } else {
        return {
          ...state,
        }
      }
    default:
      return state;
  }
};

export default reducer;
