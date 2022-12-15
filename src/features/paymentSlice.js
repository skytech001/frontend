import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentMethod: "",
  },
  reducers: {
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

export default paymentSlice.reducer;
export const { savePaymentMethod } = paymentSlice.actions;
