import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => {
      state = { ...action.payload }
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser } = counterSlice.actions

export default counterSlice.reducer