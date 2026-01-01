import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    all_txns: [],
    pending_txns: [],
    cancelled_txns: [],
    completed_txns: [],
    overview: {}, //processes gone  through
    personal_txns: {}
  },
  reducers: {
    store: (state, action) => {
      const { type, payload } = action.payload
      switch(type) {
        case 'all':
          state.all_txns = payload
          break;
        case "cancelled":
          state.cancelled_txns = payload
          break;
        case "completed":
          state.completed_txns = payload;
          break;
        case "pending":
          state.pending_txns = payload;
          break;
        default:
          break
      }
    },
    // fetch: (state) => {
    //   return state.transaction;
    // },
    storeOverview: (state, action) => {
      state.overview = action.payload;
    },
    updatePersonalTxn: (state, action) => {
      Object.assign(state.personal_txns, action.payload)
    }
    // fetchOverview: (state) => {
    //   return state.overview;
    // }
    // store : (state, action) => {
    //   const currentTransactionStatus = state.transaction.status; // transaction status
    //   const newTransactionStatus = action.payload.status;
      
    //   const stateKeys = TRANSACTION_STATES.map((state)=> state.key);
    //   const newStatusIndex = stateKeys.indexOf(newTransactionStatus);
    //   const currentStatusIndex = stateKeys.indexOf(currentTransactionStatus); // transaction status ind


     

    //   // only change transaction slice if transaction status is above current transaction status

    //   if(currentStatusIndex <= newStatusIndex || currentStatusIndex === -1) {
    //     state.transaction = action.payload;
    //   }
      

    // },
    // fetch : (state) => {
    //   return state.transaction;
    // },



    // logStep : (state, action) => {
    //   state.steps = action.payload;
    // }

  },
})

// Action creators are generated for each case reducer function
export const { store, storeOverview, updatePersonalTxn } = transactionSlice.actions;


export default transactionSlice.reducer;