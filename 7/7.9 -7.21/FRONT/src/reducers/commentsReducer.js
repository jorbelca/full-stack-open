import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const commentsReducer = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      action.payload.map((n) => state.push(n))
    },
    createComment(state, action) {
      state.push(action.payload)
    },
    // deleteteBlogReducer(state, action) {
    //   const id = action.payload
    //   console.log(id)
    //   // const find = state.find((item) => item.id !== id)

    //   return state.map((n) =>
    //   n.id !== id ? n : ''
    // )

    // },
  },
})

export const { setComments, createComment } = commentsReducer.actions

export default commentsReducer.reducer
