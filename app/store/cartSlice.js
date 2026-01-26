import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await fetch("https://api.mealpod.shop/cart", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch cart");

  return await res.json(); // null or cart object
});

export const setSubscription = createAsyncThunk(
  "cart/setSubscription",
  async (productId) => {
    const res = await fetch("https://api.mealpod.shop/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) throw new Error("Failed to set subscription");

    return await res.json(); // updated cart
  }
);

export const clearCart = createAsyncThunk("cart/clear", async () => {
  const res = await fetch("https://api.mealpod.shop/cart", {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to clear cart");

  return null;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (!action.payload) {
          return initialState;
        }

        return {
          ...action.payload,
          status: "idle",
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })

      // setSubscription
      .addCase(setSubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSubscription.fulfilled, (state, action) => {
        return {
          ...action.payload,
          status: "idle",
        };
      })
      .addCase(setSubscription.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // clearCart
      .addCase(clearCart.fulfilled, () => initialState);
  },
});

export default cartSlice.reducer;
