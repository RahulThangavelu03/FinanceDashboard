import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import userReducer from './slices/userSlice'
import transactionsReducer from './slices/transactionsSlice'
import filtersReducer from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    transactions: transactionsReducer,
    filters: filtersReducer,
  },
})
