import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteProduct = id => {
  return async dispatch => {
    await fetch(`https://rn-shopping-list.firebaseio.com/products/${id}.json`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_PRODUCT,
      payload: { id },
    });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async dispatch => {
    const response = await fetch(
      "https://rn-shopping-list.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageUrl, description, price }),
      }
    );

    const { name: firebaseId } = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: firebaseId, title, imageUrl, description, price },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async dispatch => {
    await fetch(`https://rn-shopping-list.firebaseio.com/products/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, imageUrl, description }),
    });

    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id, title, imageUrl, description },
    });
  };
};

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://rn-shopping-list.firebaseio.com/products.json"
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
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: { products: loadedProducts },
      });
    } catch (err) {
      throw err;
    }
  };
};
