import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: false,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //ADD PRODUCTS
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getProductStart, getProductFailure, getProductSuccess } =
  ProductSlice.actions;
export default ProductSlice.reducer;
