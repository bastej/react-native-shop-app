export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    payload: { id },
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
  return {
    type: UPDATE_PRODUCT,
    payload: { id, title, imageUrl, description },
  };
};
