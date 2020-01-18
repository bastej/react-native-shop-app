import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  allProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1"),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.payload.id
        ),
        allProducts: state.allProducts.filter(
          product => product.id !== action.payload.id
        ),
      };
    }
  }
  return state;
};

export default reducer;
