import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterState(state, action) {
      state = action.payload.toLowerCase()
      return state
    },
  },
})

export const { filterState } = filterReducer.actions
export default filterReducer.reducer
