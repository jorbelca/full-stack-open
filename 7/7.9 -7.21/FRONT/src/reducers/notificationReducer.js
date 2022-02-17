import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {

      state = action.payload
      return state
    },

    removeNotification(state) {
      state = initialState
      return state
    },
  },
})

export const { setNotification, removeNotification } =
  notificationReducer.actions

export default notificationReducer.reducer
