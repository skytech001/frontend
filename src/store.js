import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import clickedProductReducer from "./features/clickedProductSlice";
import addToCartReducer from "./features/addToCartSlice";
import signinReducer from "./features/signinSlice";
import registerReducer from "./features/registerSlice";
import shippingReducer from "./features/shippingSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    clickedProductDetail: clickedProductReducer,
    addToCart: addToCartReducer,
    signin: signinReducer,
    register: registerReducer,
    shipping: shippingReducer,
  },
});

export default store;
