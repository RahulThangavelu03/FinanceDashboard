import { createSlice } from '@reduxjs/toolkit'
import { mockTransactions } from '../../data/mockData'

const loadTransactions = () => {
  const saved = localStorage.getItem('transactions')
  if (saved) {
    return JSON.parse(saved)
  }
  return mockTransactions
}

const saveTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: loadTransactions(),
    loading: false,
    error: null,
  },
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.items.unshift(newTransaction)
      saveTransactions(state.items)
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
        saveTransactions(state.items)
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
      saveTransactions(state.items)
    },
    resetTransactions: (state) => {
      state.items = mockTransactions
      saveTransactions(state.items)
    },
  },
})

export const { addTransaction, updateTransaction, deleteTransaction, resetTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer
