import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import clickedProductReducer from "./features/clickedProductSlice";
import addToCartReducer from "./features/addToCartSlice";
import signinReducer from "./features/signinSlice";
import registerReducer from "./features/registerSlice";
import shippingReducer from "./features/shippingSlice";
import paymentReducer from "./features/paymentSlice";
import orderReducer from "./features/placeOrderSlice";
import detailOrderReducer from "./features/orderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    clickedProductDetail: clickedProductReducer,
    addToCart: addToCartReducer,
    signin: signinReducer,
    register: registerReducer,
    shipping: shippingReducer,
    payment: paymentReducer,
    order: orderReducer,
    detailOrder: detailOrderReducer,
  },
});

export default store;
