import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { getState }) => {
    const state = getState();
    const userInfo = state.signin.userInfo;

    const response = await axios.post("http://localhost:5000/orders", order, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    return response.data;
  }
);

const placeOrderSlice = createSlice({
  name: "order",
  initialState: {
    orderLoading: false,
    orderError: false,
    success: false,
    order: [],
  },
  reducers: {
    orderReset: (state) => {
      return (state = {});
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.success = false;
        state.orderError = action.payload;
      });
  },
});

export default placeOrderSlice.reducer;
export const { orderReset } = placeOrderSlice.actions;
