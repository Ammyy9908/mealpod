import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
};

export const fetchUserSubscriptions = createAsyncThunk("subscription/fetch", async () => {
  const res = await fetch(`/api/user/subscription`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user subscriptions");
  return await res.json(); // null or cart object
});



const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUserSubscriptions
      .addCase(fetchUserSubscriptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
        if (!action.payload) {
          return initialState;
        }

        return {
          ...action.payload,
          status: "idle",
        };
      })
      .addCase(fetchUserSubscriptions.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
  },
});

export default subscriptionSlice.reducer;


