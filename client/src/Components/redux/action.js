
export const SET_ORDER_BY_NAME = 'SET_ORDER_BY_NAME';
export const setOrderByName = (orderType) => {
    return {
      type: 'SET_ORDER_BY_NAME',
      payload: orderType
    };
  };