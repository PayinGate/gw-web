import { configureStore } from '@reduxjs/toolkit'
import transactionSlice from './slice'
import customerSlice from './customer_slice'
import overviewSlice from './overview_slice'

export default configureStore({
  reducer: {
    transaction: transactionSlice,
    customer: customerSlice,
    overview: overviewSlice
  },
})