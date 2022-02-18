import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const allUsersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state = action.payload
      return state
    },

    removeUsers(state) {
      state = initialState
      return state
    },
  },
})

export const { setUsers, removeUsers } = allUsersReducer.actions

export default allUsersReducer.reducer
