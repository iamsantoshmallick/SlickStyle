import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gender: 'men', // Default value
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setGender: (state, action) => {
      // action.payload will be 'men' or 'women'
      state.gender = action.payload;
    },
  },
});

export const { setGender } = shopSlice.actions;
export default shopSlice.reducer;