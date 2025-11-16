import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // We'll just track the count for the icon
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add reducers here later (e.g., addToCart)
  },
});

// export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;