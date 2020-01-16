import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
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
    case REMOVE_FROM_CART: {
      const currProductId = action.payload.productId;
      console.log("currProductId: ", currProductId);
      const selectedCartItem = state.items[currProductId];

      const currQuantity = selectedCartItem.quantity;

      let updatedCartItems;
      if (currQuantity > 1) {
        const updatedCartItem = new CartItem(
          currProductId,
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [currProductId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[currProductId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    }
  }
  return state;
};

export default reducer;
