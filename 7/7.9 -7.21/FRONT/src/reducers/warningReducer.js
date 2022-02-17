import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const warningReducer = createSlice({
  name: "warning",
  initialState,
  reducers: {
    setWarning(state, action) {
      state = action.payload
      return state
    },

    removeWarning(state) {
      state = initialState
      return state
    },
  },
})

export const { setWarning, removeWarning } = warningReducer.actions

export default warningReducer.reducer
