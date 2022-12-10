import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    adrress: {},
  },
  reducers: {
    saveShippingAddress: (state, { payload }) => {
      state.adrress = payload;
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
    },
  },
});

export default shippingSlice.reducer;
export const { saveShippingAddress } = shippingSlice.actions;
