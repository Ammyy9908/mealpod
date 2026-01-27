

export const selectCartCount = (state) => {
  return state.cart ? 1 : 0;
};

export const selectHasCart = (state) => {
  return Boolean(state.cart);
};
