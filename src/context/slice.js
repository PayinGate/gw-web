import { createSlice } from '@reduxjs/toolkit'
import { TRANSACTION_STATES } from '../pages/pay/outlet';

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    allowCallback: false,
    transaction: {},
    steps: [] //processes gone  through
  },
  reducers: {
    store : (state, action) => {
      const currentTransactionStatus = state.transaction.status; // transaction status
      const newTransactionStatus = action.payload.status;
      
      const stateKeys = TRANSACTION_STATES.map((state)=> state.key);
      const newStatusIndex = stateKeys.indexOf(newTransactionStatus);
      const currentStatusIndex = stateKeys.indexOf(currentTransactionStatus); // transaction status ind


     

      // only change transaction slice if transaction status is above current transaction status

      if(currentStatusIndex <= newStatusIndex || currentStatusIndex === -1) {
        state.transaction = action.payload;
      }
      

    },
    fetch : (state) => {
      return state.transaction;
    },



    logStep : (state, action) => {
      state.steps = action.payload;
    },

    setAllowCallback: (state, action) => {
      // only set if it is false
      if(!state.allowCallback){
        state.allowCallback = action.payload;
      }
    }

  },
})

// Action creators are generated for each case reducer function
export const { store, fetch, setAllowCallback } = transactionSlice.actions;

export default transactionSlice.reducer;