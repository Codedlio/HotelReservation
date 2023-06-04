// action.js
import axios from "axios";
export const SET_ORDER_BY_NAME = "SET_ORDER_BY_NAME";
export const SET_ORDER_BY_CAPACITY = "SET_ORDER_BY_CAPACITY";
export const GET_PAQUETES = "GET_PAQUETES";

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

export const getPaquetes = () => {
  return async function (dispatch) {
    console.log("entro a paquetes");
      const response = (await axios.get(`http://localhost:3001/paquete`)).data
      return dispatch({
        type: GET_PAQUETES, 
        payload: response})
  }
}