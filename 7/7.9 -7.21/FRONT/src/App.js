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
import { getAllUsers } from "./services/usersService"
import { setUsers } from "./reducers/allUsersReducer"
import commentsService from "./services/commentsService"
import { setComments } from "./reducers/commentsReducer"

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

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    if (user) {
      commentsService.getAllComments(user.token).then((comments) => {
        dispatch(setComments(comments))
      })
    }
  }, [dispatch])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    if (user) {
      getAllUsers(user.token).then((users) => dispatch(setUsers(users)))
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
              <Notification />
              <Routes>
                <Route key="000" path="/" element={<Blogs />} />
                <Route key="0000" path="/users" element={<Users />} />
                <Route key="00000" path="/users/:id" element={<User />} />
                <Route key="000000" path="/blogs/:id" element={<Blog />} />
              </Routes>
            </>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
