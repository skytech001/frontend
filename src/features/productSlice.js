import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  isLoading: false,
  error: false,
};

export const getProductList = createAsyncThunk(
  "products/getProductList",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
  // () => {
  //   return fetch("http://localhost:5000/products").then((response) =>
  //     response.json()
  //   );
  // }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  //   reducers: {
  //     productLists: (state) => {},
  //   },
  extraReducers(builder) {
    builder
      .addCase(getProductList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
// export const { productLists } = productSlice.actions;
