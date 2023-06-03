// action.js
export const SET_ORDER_BY_NAME = "SET_ORDER_BY_NAME";
export const SET_ORDER_BY_CAPACITY = "SET_ORDER_BY_CAPACITY";

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
