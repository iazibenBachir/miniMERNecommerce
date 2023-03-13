import { createSlice } from "@reduxjs/toolkit";
const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const setItemFunc = (item) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
};
const initialState = {
  cartItems: items,
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // =========== add item to Cart ============
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existedItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (!existedItem) {
        state.cartItems.push({ ...action.payload });
      } else {
        existedItem.quantity = newItem.quantity;
      }
      setItemFunc(state.cartItems.map((item) => item));
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      setItemFunc(state.cartItems.map((item) => item));
    },
    toggleShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

const { reducer, actions } = cartSlice;
export default reducer;
export const { toggleShowCart, removeCartItem, decrementQuantity, incrementQuantity, addToCart } = actions

