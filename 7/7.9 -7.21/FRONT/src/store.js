import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import warningReducer from "./reducers/warningReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    warning: warningReducer,
  },
})

export default store
