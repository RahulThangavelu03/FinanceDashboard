import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: localStorage.getItem('userRole') || 'viewer',
    name: 'Rohan',
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
      localStorage.setItem('userRole', action.payload)
    },
  },
})

export const { setRole } = userSlice.actions
export default userSlice.reducer
