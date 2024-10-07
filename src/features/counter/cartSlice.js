import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity; // Update quantity
      } else {
        state.cartItems.push(item); // Add new item
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (quantity <= 0) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },
    
  },
});


export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
