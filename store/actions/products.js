import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const response = await fetch(
      `https://rn-shopping-list.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      payload: { id },
    });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    const response = await fetch(
      `https://rn-shopping-list.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
          ownerId: userId,
        }),
      }
    );

    const { name: firebaseId } = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: firebaseId,
        title,
        imageUrl,
        description,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;
    const response = await fetch(
      `https://rn-shopping-list.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageUrl, description }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id, title, imageUrl, description },
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const response = await fetch(
        `https://rn-shopping-list.firebaseio.com/products.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      const userProducts = loadedProducts.filter(
        product => product.ownerId === userId
      );

      dispatch({
        type: SET_PRODUCTS,
        payload: { products: loadedProducts, userProducts },
      });
    } catch (err) {
      throw err;
    }
  };
};
