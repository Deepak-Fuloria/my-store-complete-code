import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: {
    login: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    islogin: (state, action) => {
      if (action.payload === 1) {
        state.userStatus = { ...state.userStatus, login: 1 };
      } else {
        state.userStatus = { ...state.userStatus, login: 0 };
      }
    },
  },
});

export const { islogin } = userSlice.actions;

export default userSlice.reducer;
