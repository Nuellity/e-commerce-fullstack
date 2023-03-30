import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //ADD ORDER
    addOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { addOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
