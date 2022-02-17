import React from "react"
import "./App.css"
import { useState, useEffect } from "react"
import blogService from "./services/blogService"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs))
    }
  }, [])

  return (
    <div>
      <Notification />
      {user === null ? (
        <Login setBlogs={setBlogs} setUser={setUser} />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          setUser={setUser}
          setBlogs={setBlogs}
        />
      )}
    </div>
  )
}

export default App
