import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationLike(state, action) {
      state = action.payload
      return state
    },
    notificationCreate(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = initialState
      return state
    },
  },
})

export const { notificationLike, notificationCreate, removeNotification } =
  notificationReducer.actions

export const setNotification = (content, timeout) => {
  if (content.substring(0, 14) === "You have liked") {
    return (dispatch) => {
      dispatch(notificationLike(content))
      setTimeout(async () => {
        await dispatch(removeNotification())
      }, timeout * 1000)
    }
  }
  if (content.substring(0, 16) === "You have created") {
    return (dispatch) => {
      dispatch(notificationLike(content))
      setTimeout(() => {
        dispatch(removeNotification())
      }, timeout * 1000)
    }
  }
}

export default notificationReducer.reducer
