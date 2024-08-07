import { createSlice } from "@reduxjs/toolkit";

const cartItemStorageName = "cartItems";

let cartItemsFromStorage = localStorage.getItem(cartItemStorageName);
try {
  cartItemsFromStorage =
    cartItemsFromStorage && JSON.parse(cartItemsFromStorage)
      ? JSON.parse(cartItemsFromStorage)
      : [];
} catch (err) {
  cartItemsFromStorage = [];
}

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cart = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, { payload }) => {
      const isExist = state.cartItems.find(
        (item) => item.product === payload.product
      );

      if (isExist) {
        // update
        state.cartItems = state.cartItems.map((item) =>
          item.product === payload.product ? payload : item
        );
      } else {
        // add
        state.cartItems = [...state.cartItems, payload];
      }
      
      localStorage.setItem(
        cartItemStorageName,
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product != payload
      );
      localStorage.setItem(
        cartItemStorageName,
        JSON.stringify(state.cartItems)
      );
    },

    addShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      localStorage.setItem(shippingAddressName, JSON.stringify(payload));
    },

    emptyCart: (state) => {
      (state.cartItems = []), (state.cartItems = []);
      state.shippingAddress = null;
      state.subTotal = 0;
      state.saleTax = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      localStorage.setItem(cartItemStorageName, []);
      localStorage.setItem(shippingAddressName, null);
    },
  },
});

export default cart.reducer;
export const { addToCart, removeFromCart, emptyCart, addShippingAddress } =
  cart.actions;
