import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    dateRange: {
      start: '',
      end: '',
    },
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setTypeFilter: (state, action) => {
      state.type = action.payload
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload
    },
    resetFilters: (state) => {
      state.search = ''
      state.type = 'all'
      state.category = 'all'
      state.sortBy = 'date'
      state.sortOrder = 'desc'
      state.dateRange = { start: '', end: '' }
    },
  },
})

export const {
  setSearch,
  setTypeFilter,
  setCategoryFilter,
  setSortBy,
  setSortOrder,
  setDateRange,
  resetFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
