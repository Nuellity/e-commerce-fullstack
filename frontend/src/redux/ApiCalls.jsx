import { publicRequest } from "../axiosRequest";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./ProductSlice";
import {
  forgetFailure,
  forgetStart,
  forgetSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/signin", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loginFailure(error.response.data));
    } else {
      console.log(error);
    }
  }
};

export const googleAuth = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/google-signin", user);

    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(loginFailure(error.response.data));
    } else {
      console.log(error);
    }
  }
};

export const logout = (dispatch) => {
  dispatch(logoutSuccess());
};

export const signup = async (dispatch, user) => {
  dispatch(signUpStart());
  try {
    const res = await publicRequest.post("/auth/signup", user);
    dispatch(signUpSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(signUpFailure(error.response.data));
    } else if (error.response && error.response.status === 409) {
      // Duplicate key error
      dispatch(signUpFailure(error.response.data.error));
      console.log(error.response.data.error);
    } else {
      console.log(error);
    }
  }
};

export const forgetPassword = async (dispatch, user) => {
  dispatch(forgetStart());
  try {
    const res = await publicRequest.post("/auth/forgotpassword", user);
    dispatch(forgetSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(forgetFailure(error.response.data));
    } else {
      console.log(error);
    }
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
