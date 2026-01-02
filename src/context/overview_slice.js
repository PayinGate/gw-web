import { createSlice } from '@reduxjs/toolkit'

export const overviewSlice = createSlice({
  name: 'overview',
  initialState: {
    stats: null
  },
  reducers: {
    storeStats: (state, action) => {
        state.stats = action.payload;
    }
  }
});

export const { storeStats } = overviewSlice.actions;

export default overviewSlice.reducer;