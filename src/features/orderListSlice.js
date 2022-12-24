import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../node_modules/axios/index";

export const myOrders = createAsyncThunk(
  "orderList/myOrders",
  async (id, { rejectWithValue, getState }) => {
    const state = getState();
    const userInfo = state.signin.userInfo;

    try {
      const response = await axios.get("http://localhost:5000/orders/mine", {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderListSlice = createSlice({
  name: "orderList",
  initialState: {
    loading: false,
    error: "",
    userOrders: [],
    currentOrder: "",
  },
  reducers: {
    getThisOrder: (state, { payload }) => {
      state.currentOrder = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderListSlice.reducer;
export const { getThisOrder } = orderListSlice.actions;
