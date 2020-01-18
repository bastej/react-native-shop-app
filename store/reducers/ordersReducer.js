import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const { cartItems, totalAmount } = action.payload;
      const newOrder = new Order(
        new Date().toString(),
        cartItems,
        totalAmount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }
  }
  return state;
};

export default reducer;
