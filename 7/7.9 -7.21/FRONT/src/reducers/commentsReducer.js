import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const commentsReducer = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      const i = action.payload

      i.map((n) => state.push(n))
    },
    createComment(state, action) {
      const i = action.payload
      state.concat(i)
    },
    // deleteteBlogReducer(state, action) {
    //   const id = action.payload
    //   console.log(id)
    //   // const find = state.find((item) => item.id !== id)

    //   return state.map((n) =>
    //   n.id !== id ? n : ''
    // )

    // },
    // updateLikesReducer(state, action) {
    //   const id = action.payload
    //   const filtredBlog = state.find((item) => item.id === id)

    //   filtredBlog.likes++
    // },
  },
})

export const { setComments, createComment } = commentsReducer.actions

export default commentsReducer.reducer
