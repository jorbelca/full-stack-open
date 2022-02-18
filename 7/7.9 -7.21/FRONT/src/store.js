import { configureStore } from "@reduxjs/toolkit"
import allUsersReducer from "./reducers/allUsersReducer"
import blogsReducer from "./reducers/blogsReducer"
import commentsReducer from "./reducers/commentsReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"
import warningReducer from "./reducers/warningReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    warning: warningReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: allUsersReducer,
    comments: commentsReducer,
  },
})

export default store
