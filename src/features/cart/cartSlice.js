import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // defined the addToCart reducer logic
    addToCart(state, action) {
      state.items.push(action.payload);
    },
  },
});

// Export the action so ProductPage.jsx can import it
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;