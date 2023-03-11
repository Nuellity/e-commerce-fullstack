import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isSignUp: false,
    error: false,
    signUpError: false,
    errorMessage: null,
    isForget: false,
    forgetError: false
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
      state.isForget = false;
    },
    signUpStart: (state) => {
      state.isSignUp = true;
      state.currentUser = null;
      state.errorMessage = null;
      state.signUpError = false;
    },
    signUpSuccess: (state, action) => {
      state.isSignUp = false;
      state.currentUser = action.payload;
      state.errorMessage = null;
      state.signUpError = false;
    },
    signUpFailure: (state, action) => {
      state.isSignUp = false;
      state.currentUser = null;
      state.signUpError = true;
      state.errorMessage = action.payload;
    },
    forgetStart: (state) => {
      state.isForget = true;
      state.currentUser = null;
      state.errorMessage = null;
      state.forgetError = false
    },
    forgetSuccess: (state, action) => {
      state.isForget = false;
      state.errorMessage = null;
      state.currentUser = action.payload
      state.forgetError = false;
    },
    forgetFailure: (state, action) => {
      state.isForget = false;
      state.errorMessage = action.payload;
      state.forgetError = true
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  forgetFailure,
  forgetStart,
  forgetSuccess,
} = userSlice.actions;
export default userSlice.reducer;
