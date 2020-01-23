import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const { id, cartItems, totalAmount, date } = action.payload;
      const newOrder = new Order(id, cartItems, totalAmount, date);

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders,
      };
    }
  }
  return state;
};

export default reducer;
