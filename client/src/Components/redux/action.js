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
export const SUGERENCIA_EMAIL = "SUGERENCIA_EMAIL"; 

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
      const response = (await axios.get(`http://localhost:3001/paquete`)).data
      return dispatch({
        type: GET_PAQUETES, 
        payload: response})
  }
};


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
        
        const {data} = await axios.get("http://localhost:3001/habitacion");
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
export const sugerenciaCliente= (userData) =>{
  return async (dispatch) => {
      try {
          const newSugerencia = await axios.post("http://localhost:3001/auth/notification", userData);
          console.log(userData)
          return dispatch({ type:SUGERENCIA_EMAIL, payload: newSugerencia.data });
          
      } catch (error) { console.log(error.message) }
  }
}