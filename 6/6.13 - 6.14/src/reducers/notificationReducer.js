import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationLike(state, action) {
      state = `You have liked: ${action.payload}`
      return state
    },
    notificationCreate(state, action) {
      state = `You have created: ${action.payload}`

      return state
    },
    removeSt(state) {
      state = initialState
      return state
    },
  },
})

export const { notificationLike, notificationCreate, removeSt } =
  notificationReducer.actions
export default notificationReducer.reducer
