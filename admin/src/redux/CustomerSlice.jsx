import { createSlice } from "@reduxjs/toolkit";

export const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers = action.payload;
    },
    getCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.splice(
        state.customers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers[
        state.customers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.push(action.payload);
    },
    addCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCustomerStart,
  getCustomerSuccess,
  getCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  updateCustomerStart,
  updateCustomerSuccess,
  updateCustomerFailure,
  addCustomerStart,
  addCustomerSuccess,
  addCustomerFailure,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
