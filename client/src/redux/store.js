import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import authReducer from "./features/authSlice";
import currentProdReducer from "./features/currentProdSlice"
import snackbarReducer from "./features/snackbarSlice"
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
    currentProd: currentProdReducer,
    snackbar: snackbarReducer
  },
});
export default store;
