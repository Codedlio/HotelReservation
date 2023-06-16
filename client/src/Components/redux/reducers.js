// reducer.js

import { SET_ORDER_BY_NAME, SET_ORDER_BY_CAPACITY, SET_ORDER_BY_PRICE, GET_PAQUETES,SET_CURRENT_PAGE, SET_USUARIO, SUGERENCIA_EMAIL, DELETE_USUARIO, GET_HABITACIONES, SET_FILTERED_HABITACIONES, GET_HABITACIONES_DISPONIBLES,ORDER_PAQUETES,GET_PAQUETES_BY_ID,GET_RESERVA_BY_USER, SET_ADULTS, SET_CHILDREN, SET_DATES, SET_PRECIO, SET_SELECTEDROOM, SET_SELECTEDSERVICE, SET_SELECTEDPAQUETE,FILTER_NAME_PAQUETE, GET_PAQUETES_DISPONIBLES, SET_FILTERS, SET_NOMBRESFORM} from "./action";

const initialState = {
  orderByName: '',
  orderByCapacity: '',
  orderByPrice: '',
  allpaquetes: [],
  orderPaquetes: [],
  filterPaquetes: [],
  set_Current_Page: [],
  usuario: undefined,
  gethabitaciones: [],
  habitaciones: [],
  filteredhabitaciones: [],
  filters: {searchQuery:'', minPrice:0, maxPrice:0},
  paqueteXid: [],
  reserva:[],
  formulario: {adults: 0, children: 0, selectedRoom: [], selectedService: [], dates: {checkIn:'', checkOut:''}, precio: 0, selectedPaquete: [], nombres:{habitaciones:[],paquete:[],servicios:[]}}
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
        sortedArrByCapacity = state.habitaciones
          .slice()
          .sort((a, b) => a.capacidad - b.capacidad);
      } else if (action.payload === 'desc') {
        sortedArrByCapacity = state.habitaciones
          .slice()
          .sort((a, b) => b.capacidad - a.capacidad);
      } else {
        sortedArrByCapacity = state.habitaciones;
      }
      return {
        ...state,
        orderByCapacity: action.payload,
        habitaciones: sortedArrByCapacity
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
        allpaquetes: action.payload ,           
        orderPaquetes: action.payload,//aca lleno 
        filterPaquetes: action.payload
    } 
    case GET_PAQUETES_DISPONIBLES: return {
      ...state,
      allpaquetes: action.payload
    }
    case GET_PAQUETES_BY_ID: return {
      ...state,
      paqueteXid: action.payload 
    } 
    case ORDER_PAQUETES:     
    console.log("ORDER_PAQUETES-action.payload") ; 
    console.log(action.payload) ;  
    const Paquetes = [...state.allpaquetes];    
    const SortPaquetes = (action.payload === 'asc'? Paquetes.sort((a, b) => a.nombre.localeCompare(b.nombre))
    : (action.payload === 'desc')? Paquetes.sort((a, b) => b.nombre.localeCompare(a.nombre))
    : (action.payload === 'costoAsc')? Paquetes.sort((a, b) => a.costo-b.costo)
    :(action.payload === 'costoDesc')? Paquetes.sort((c1,c2) => {    
           if (c1.costo < c2.costo) return 1;
           if (c1.costo > c2.costo) return -1;  
           return 0;
    }): Paquetes)            
    return{
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
      case SET_FILTERED_HABITACIONES: 
      return {
        ...state,
        filteredhabitaciones: action.payload
      }
      case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload[0]]: action.payload[1]
        }
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
        if(action.payload.status === 200) {
          return { ...state, 
                } 
        } else {
          return { ...state, 
                }
        }
      
      case SET_ADULTS:
        return {...state, formulario: {...state.formulario, adults:action.payload}};
      
      case SET_CHILDREN:
        return {...state, formulario:{...state.formulario, children:action.payload}};
      
      case SET_SELECTEDROOM:
        return {...state, formulario: {...state.formulario, selectedRoom:action.payload}};
      
      case SET_SELECTEDSERVICE:
        return {...state, formulario: {...state.formulario, selectedService:action.payload}};

      case SET_DATES:
        return {...state, formulario: {...state.formulario, dates:action.payload}};
      
      case SET_PRECIO:
        return {...state, formulario: {...state.formulario, precio:action.payload}};

      case SET_SELECTEDPAQUETE:
        return {...state, formulario: {...state.formulario, selectedPaquete:action.payload}};
      
      case SET_NOMBRESFORM:
        return {...state, formulario: {...state.formulario, nombres: {...state.formulario.nombres, [action.payload.key]: action.payload.array}}};
      default:  
        return state;
  }
};

export default reducer;
