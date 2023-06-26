/* eslint-disable no-unused-vars */
import { publicRequest, userRequest } from "../axiosRequest";
import {
  addCustomerFailure,
  addCustomerStart,
  addCustomerSuccess,
  deleteCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  getCustomerFailure,
  getCustomerStart,
  getCustomerSuccess,
  updateCustomerFailure,
  updateCustomerStart,
  updateCustomerSuccess,
} from "./CustomerSlice";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
} from "./OrderSlice";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./ProductSlice";
import {
  deleteReviewFailure,
  deleteReviewStart,
  deleteReviewSuccess,
  getReviewFailure,
  getReviewStart,
  getReviewSuccess,
  updateReviewFailure,
  updateReviewStart,
  updateReviewSuccess,
} from "./ReviewSlice";
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
} from "./UserSlice";

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

export const getReviews = async (dispatch, navigate) => {
  dispatch(getReviewStart());
  try {
    const res = await userRequest.get("/reviews");
    dispatch(getReviewSuccess(res.data));
  } catch (err) {
    dispatch(getReviewFailure());
    if (err.response && err.response.status === 403) {
      logout(dispatch);
      navigate("/login");
    } else if (err.response && err.response.status === 401) {
      window.location.reload();
    }
  }
};

export const deleteReview = async (id, dispatch) => {
  dispatch(deleteReviewStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteReviewSuccess(id));
  } catch (err) {
    dispatch(deleteReviewFailure());
  }
};

export const updateReview = async (id, review, dispatch) => {
  dispatch(updateReviewStart());
  try {
    const res = await userRequest.patch(`/reviews/${id}`, review);
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getCustomers = async (dispatch) => {
  dispatch(getCustomerStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getCustomerSuccess(res.data));
  } catch (err) {
    dispatch(getCustomerFailure());
  }
};

export const deleteCustomer = async (id, dispatch) => {
  dispatch(deleteCustomerStart());
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteCustomerSuccess(id));
  } catch (err) {
    dispatch(deleteCustomerFailure());
  }
};

export const updateCustomer = async (id, customer, dispatch) => {
  dispatch(updateCustomerStart());
  try {
    const res = await userRequest.patch(`/users/${id}`, customer);
    dispatch(updateCustomerSuccess(res.data));
  } catch (err) {
    dispatch(updateCustomerFailure());
  }
};
export const addCustomer = async (customer, dispatch) => {
  dispatch(addCustomerStart());
  try {
    const res = await userRequest.post("/users", customer);
    console.log(res.data);
    dispatch(addCustomerSuccess(res.data));
  } catch (err) {
    dispatch(addCustomerFailure());
    console.log(err);
  }
};

export const getOrders = async (dispatch, navigate) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
    if (err.response && err.response.status === 403) {
      logout(dispatch);
      navigate("/login");
    } else if (err.response && err.response.status === 401) {
      window.location.reload();
    }
  }
};

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(res.data));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.patch(`/orders/${id}`, order);
    console.log("work");
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
export const addOrder = async (order, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post("/orders", order);
    console.log(res.data);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
    console.log(err);
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

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.patch(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
