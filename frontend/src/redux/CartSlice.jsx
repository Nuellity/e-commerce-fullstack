import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity
    },
    removeProduct: (state,action) => {
      const index = action.payload;
      const removedProduct = state.products[index];
      if (removedProduct) {
    state.quantity -= removedProduct.quantity;
    state.total -= removedProduct.price * removedProduct.quantity;
    state.products.splice(index, 1);
  }
    },
    clearProduct: (state,action) => {
      state.products = []
      state.quantity = 0;
      state.total =0
    },
  },
});

export const{addProduct, removeProduct, clearProduct} = cartSlice.actions;
export default cartSlice.reducer;
