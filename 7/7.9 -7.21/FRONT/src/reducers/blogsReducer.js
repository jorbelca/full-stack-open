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
      state.push(action.payload)
    },
    deleteteBlogReducer(state, action) {
      return state.filter((element) => element.id !== action.payload)
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
