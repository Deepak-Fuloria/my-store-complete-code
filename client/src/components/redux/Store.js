import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import userReducer from "./userSlice";
import cartReducer from "./CartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
