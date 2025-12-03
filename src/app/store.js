//src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import shopReducer from '../features/shop/shopSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shop: shopReducer,
  },
});