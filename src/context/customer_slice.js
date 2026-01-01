import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    personal_customers: {}
  },
  reducers: {
    store: (state, action) => {
        state.transaction = action.payload;
    },
    updatePersonalCustomer: (state, action) => {
        Object.assign(state.personal_customers, action.payload);
    }
  }
});


export const {updatePersonalCustomer } = customerSlice.actions;

export default customerSlice.reducer;