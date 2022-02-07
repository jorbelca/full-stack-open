import "./App.css"
import { useState, useEffect } from "react"
import blogService from "./services/blogService"
import Login from "./components/Login"
import Blogs from "./components/Blogs"

const Message = ({ message, warning }) => {
  return (
    <>
      {message ? <div className="message">{message}</div> : ""}
      {warning ? <div className="warning">{warning}</div> : ""}
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [warning, setWarning] = useState("")

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
      <Message message={message} warning={warning} />
      {user === null ? (
        <Login setBlogs={setBlogs} setUser={setUser} setWarning={setWarning} />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          setUser={setUser}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setWarning={setWarning}
        />
      )}
    </div>
  )
}

export default App
