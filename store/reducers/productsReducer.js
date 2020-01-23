import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";

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
    case CREATE_PRODUCT: {
      const { id, title, imageUrl, price, description } = action.payload;
      const newProduct = new Product(
        id,
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        allProducts: state.allProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }
    case UPDATE_PRODUCT: {
      const { id, title, imageUrl, description } = action.payload;

      const userProductIndex = state.userProducts.findIndex(
        prod => prod.id === id
      );

      console.log(state.userProducts[userProductIndex].price);
      const updatedProduct = new Product(
        id,
        state.userProducts[userProductIndex].ownerId,
        title,
        imageUrl,
        description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const productIndex = state.allProducts.findIndex(prod => prod.id === id);
      const updatedAllProducts = [...state.allProducts];
      updatedAllProducts[productIndex] = updatedProduct;

      return {
        ...state,
        allProducts: updatedAllProducts,
        userProducts: updatedUserProducts,
      };
    }
  }
  return state;
};

export default reducer;
