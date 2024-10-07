import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/counter/cartSlice'; // Cart slice
import wishlistReducer from '../features/counter/wishlistSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer, // Combine the cart slice reducer
  },
});

export default store;