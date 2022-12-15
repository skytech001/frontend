import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderDetails = createAsyncThunk(
  "detailOrder/orderDetails",
  async (orderId, { getState }) => {
    const state = getState();
    const userInfo = state.signin.userInfo;

    try {
      const response = await axios.get(
        `http://localhost:5000/orders/${orderId}`,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return message;
    }
  }
);

const orderSlice = createSlice({
  name: "detailOrder",
  initialState: {
    detailLoading: true,
    detailError: "",
    detailedOrder: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderDetails.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detailedOrder = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export default orderSlice.reducer;
