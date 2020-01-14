import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
const initialState = {
  items: {},
  totalAmount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newProduct = action.payload;
      const productId = newProduct.id;
      const productPrice = newProduct.price;
      const productTitle = newProduct.title;

      let currentProduct;

      if (state.items[productId]) {
        const existingProduct = state.items[productId];
        currentProduct = new CartItem(
          productId,
          existingProduct.quantity + 1,
          productPrice,
          productTitle,
          existingProduct.sum + productPrice
        );
      } else {
        currentProduct = new CartItem(
          productId,
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [productId]: currentProduct,
        },
        totalAmount: state.totalAmount + productPrice,
      };
    }
  }
  return state;
};

export default reducer;
