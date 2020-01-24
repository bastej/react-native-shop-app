import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    try {
      const { token, userId } = getState().auth;
      const date = new Date();
      const response = await fetch(
        `https://rn-shopping-list.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { name: firebaseId } = await response.json();

      dispatch({
        type: ADD_ORDER,
        payload: { id: firebaseId, cartItems, totalAmount, date },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const response = await fetch(
        `https://rn-shopping-list.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        alert(11);

        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, payload: { orders: loadedOrders } });
    } catch (err) {
      throw err;
    }
  };
};
