// action.js
import axios from "axios";
export const SET_ORDER_BY_NAME = "SET_ORDER_BY_NAME";
export const SET_ORDER_BY_CAPACITY = "SET_ORDER_BY_CAPACITY";
export const SET_ORDER_BY_PRICE = "SET_ORDER_BY_PRICE";
export const GET_PAQUETES = "GET_PAQUETES";
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const GET_HABITACIONES = "GET_HABITACIONES";
export const SET_USUARIO = "SET_USUARIO";
export const DELETE_USUARIO = "DELETE_USUARIO";
export const ERROR = "ERROR"; 
export const GET_HABITACIONES_DISPONIBLES = "GET_HABITACIONES_DISPONIBLES";
export const SUGERENCIA_EMAIL = "SUGERENCIA_EMAIL"; 
export const ORDER_PAQUETES = "ORDER_PAQUETES";
export const GET_PAQUETES_BY_ID = "GET_PAQUETES_BY_ID";
export const CREATE_RESERVA = "CREATE_RESERVA";
export const GET_RESERVA_BY_USER ="GET_RESERVA_BY_USER";

export const setOrderByName = (orderType) => {
  return {
    type: SET_ORDER_BY_NAME,
    payload: orderType
  };
};

export const setOrderByCapacity = (orderType) => {
  return {
    type: SET_ORDER_BY_CAPACITY,
    payload: orderType
  };
};
// export const setOrderByPrice = (orderType) => {
//   return {
//     type: SET_ORDER_BY_PRICE,
//     payload: orderType
//   };
// };

export const getPaquetes = () => {
  return async function (dispatch) {
    console.log("entro a paquetes");
      const response = (await axios.get(`/paquete`)).data
      return dispatch({
        type: GET_PAQUETES, 
        payload: response})
  }
};

export function getPaqueteById(id) {
  return async function (dispatch) {
    console.log("entro a paquetes");
      const response = (await axios.get(`/paquete/`+id)).data
      return dispatch({
        type: GET_PAQUETES_BY_ID, 
        payload: response})
  }
}
export const orderxPaquetes = (order) => { return { type: ORDER_PAQUETES, payload: order } }

export const createReserva = (reserva) =>{ 
  let url = `/reservation`;
  const response = axios.post(url,reserva);
 
  return response;
 }
 
 export function getReservaByUsuario(usuario) {
   return async function (dispatch) {    
       const response = (await axios.get(`/reservation/`+usuario)).data
       return dispatch({
         type: GET_RESERVA_BY_USER, 
         payload: response})
   }
 }
 

export const set_Currents_Page = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage
  };
};
export const getHabitaciones = () => {
  return async function (dispatch) {
    
    try {
      
      
        const storedData = window.sessionStorage.getItem("allHabitaciones");
        if (storedData) {
          const data=JSON.parse(storedData)
          return dispatch({
            type: GET_HABITACIONES,
            payload: data,
          }); 
        }
        
        const {data} = await axios.get("/habitacion");
        window.sessionStorage.setItem("allHabitaciones", JSON.stringify(data));
        
        return dispatch({
          type: GET_HABITACIONES,
          payload: data,
        });
       
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const setUsuario = (correo) => {
  return {type:SET_USUARIO, payload: correo}  
};

export const deleteUsuario = () => {
  return {type:DELETE_USUARIO}
};

export const getHabitacionesDisponibles = (fechaInicio,fechaFin) => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(`/habitacion/disponible?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      return dispatch({type:GET_HABITACIONES_DISPONIBLES, payload:data});
    } 
    catch (error) {
      alert(error.message);  
    };
  };
};

export const sugerenciaCliente= (userData) =>{
  return async (dispatch) => {
      try {
          const newSugerencia = await axios.post("/auth/notification", userData);
          console.log(userData)
          return dispatch({ type:SUGERENCIA_EMAIL, payload: newSugerencia.data });
          
      } catch (error) { console.log(error.message) }
  }
}
