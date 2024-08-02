import { configureStore } from '@reduxjs/toolkit'
import transactionSlice from './slice'

export default configureStore({
  reducer: {
    transaction: transactionSlice
  },
})