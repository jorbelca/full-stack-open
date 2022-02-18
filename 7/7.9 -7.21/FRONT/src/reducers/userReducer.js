import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    },

    removeUser(state) {
      state = initialState
      return state
    },
  },
})

export const { setUser, removeUser } = userReducer.actions

export default userReducer.reducer
