import { createSlice } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const initialState = {
  cartItems: "",
};

const cartSlice = createSlice({
  name: "userCart",
  initialState: initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
