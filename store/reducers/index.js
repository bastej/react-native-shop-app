import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});
