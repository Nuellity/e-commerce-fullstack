import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: true,
    errorMessage: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.currentUser = null;
      state.errorMessage = null;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.errorMessage = null;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = true;
      state.errorMessage = action.payload;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.errorMessage = null;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
