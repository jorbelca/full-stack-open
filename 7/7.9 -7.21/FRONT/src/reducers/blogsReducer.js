import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const blogsReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      const i = action.payload
      i.map((n) => state.push(n))
    },
    createBlogReducer(state, action) {
      const i = action.payload
      state.concat(i)
    },
    deleteteBlogReducer(state, action) {
      const id = action.payload
      console.log(id)
      // const find = state.find((item) => item.id !== id)

      return state.map((n) =>
      n.id !== id ? n : ''
    )
      
    },
    updateLikesReducer(state, action) {
      const id = action.payload
      const filtredBlog = state.find((item) => item.id === id)

      filtredBlog.likes++
    },
  },
})

export const {
  setBlogs,
  createBlogReducer,
  deleteteBlogReducer,
  updateLikesReducer,
} = blogsReducer.actions

export default blogsReducer.reducer
