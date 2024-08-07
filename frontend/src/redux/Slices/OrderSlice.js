import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
  success: false,
};

const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderCreated: (state, { payload }) => {
      state.orderId = payload;
      state.success = true;
    },
    resetOrder: (state) => {
      state.orderId = null;
      state.success = false;
    },
  },
});

export const { orderCreated, resetOrder } = order.actions;

export default order.reducer;
