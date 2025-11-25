import { createSlice } from '@reduxjs/toolkit';

// Helper to calculate totals to ensure consistency
const calculateTotals = (items) => {
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalAmount, totalCount };
};

const initialState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      // Check if item with same ID AND Size already exists
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          brand: newItem.brand,
          price: newItem.price,
          img: newItem.img,
          size: newItem.size,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },

    removeFromCart(state, action) {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => item.id !== id || item.size !== size
      );
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },

    increaseQuantity(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },

    decreaseQuantity(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // If quantity is 1, remove the item entirely
          state.items = state.items.filter(
            (item) => item.id !== id || item.size !== size
          );
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;