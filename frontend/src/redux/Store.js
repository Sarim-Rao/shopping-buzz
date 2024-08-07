import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import AuthSlice from "./Slices/AuthSlice";
import orderSlice from "./Slices/OrderSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    auth:AuthSlice,
    order: orderSlice,
  },

  middleware: (defaultMiddleware) =>
   
    defaultMiddleware({
      serializableCheck: false,
    }),
 
});

export default store;
