import { createSlice } from '@reduxjs/toolkit'

export const DisplayState = createSlice({
  name: 'ColorsDisplay',
  initialState: {
  value: "none"
  },
  reducers: {
    SHOW: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = ""
    },
    HIDE: state => {
      state.value = "none"
    },
  }
})

// Action creators are generated for each case reducer function
export const { SHOW, HIDE } = DisplayState.actions

export default DisplayState.reducer