export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    payload: { id },
  };
};
