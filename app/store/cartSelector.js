

export const selectCartCount = (state) => {
  return state.cart?.productId ? 1 : 0;
};

export const selectHasCart = (state) => {
  return Boolean(state.cart?.productId);
};
