import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import subscriptionReducer from "./subscriptionSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    subscription: subscriptionReducer,
  },
});
