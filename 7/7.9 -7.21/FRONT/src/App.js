import React from "react"
import "./App.css"
import { useEffect } from "react"
import blogService from "./services/blogService"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { setBlogs } from "./reducers/blogsReducer"
import { setUser } from "./reducers/userReducer"

import { BrowserRouter as Router } from "react-router-dom"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"

import Blog from "./components/Blog"
import Navigation from "./components/Navigation"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.getAll(user.token).then((blogs) => dispatch(setBlogs(blogs)))
    }
  }, [dispatch])

  return (
    <div>
      {user === null ? (
        <Login />
      ) : (
        <div>
          <Router>
            <Navigation />
            <>
              <Routes>
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog />} />
              </Routes>
            </>
          </Router>

          <Notification />
        </div>
      )}
    </div>
  )
}

export default App
