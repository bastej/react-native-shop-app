import omit from "lodash/omit";

import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

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
      const tempStoreCopy = { ...state.items };
      tempStoreCopy[productId] = currentProduct;

      return {
        ...state,
        items: tempStoreCopy,
        totalAmount: state.totalAmount + productPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const currProductId = action.payload.productId;
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
        const tempStoreCopy = { ...state.items };
        tempStoreCopy[currProductId] = updatedCartItem;
        updatedCartItems = tempStoreCopy;
      } else {
        const tempStoreCopy = { ...state.items };
        updatedCartItems = omit(tempStoreCopy, currProductId);
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    }
    case ADD_ORDER: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      const itemId = action.payload.id;

      if (!state.items[itemId]) return state;

      const itemTotal = state.items[itemId].sum;

      const updatedItems = omit(state.items, itemId);

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    }
  }
  return state;
};

export default reducer;
