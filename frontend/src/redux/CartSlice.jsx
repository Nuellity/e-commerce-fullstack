import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //ADD PRODUCT
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    //DELETE
    deleteProduct: (state, action) => {
      const index = action.payload;
      const deletedItem = state.products[index];
      state.total -= deletedItem.amount;
      state.products.splice(index, 1);
      const updatedQuantity = state.products.length;
      state.quantity = updatedQuantity;
    },

    //CLEAR CART
    clearProduct: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, clearProduct, deleteProduct } = CartSlice.actions;
export default CartSlice.reducer;
