import "./App.css"
import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
const Message = ({ message, warning }) => {
  return (
    <>
      {message ? <div className="message">{message}</div> : ""}
      {warning ? <div className="warning">{warning}</div> : ""}
    </>
  )
}
const Login = ({
  setPassword,
  setUsername,
  handleLogin,
  username,
  password,
}) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="current-password"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    </>
  )
}

const Blogs = ({
  blogs,
  user,
  setUser,
  url,
  title,
  setTitle,
  setUrl,
  handleCreate,
  setBlogs,
  setWarning,
  setMessage,
}) => {
  return (
    <>
      <h5>
        {user.name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedUser")
            setUser(null)
          }}
        >
          Logout
        </button>
      </h5>
      <Add
        url={url}
        title={title}
        setTitle={setTitle}
        handleCreate={handleCreate}
        setUrl={setUrl}
      />
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setBlogs={setBlogs}
          blogs={blogs}
          setMessage={setMessage}
          setWarning={setWarning}
        />
      ))}
    </>
  )
}

const Add = ({ url, title, setUrl, setTitle, handleCreate }) => {
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        Title:{" "}
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Url:{" "}
        <input
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
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

  const handleCreate = (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: title,
        url: url,
        author: user.name,
        likes: 0,
      }
      blogService.createBlog(user.token, newBlog)
      setBlogs(blogs.concat(newBlog))
      setTimeout(
        () => blogService.getAll(user.token).then((blogs) => setBlogs(blogs)),
        500
      )
      setMessage(`The new Blog ${title} by ${user.name} has been created`)
      setTimeout(() => setMessage(""), 4000)
      setTitle("")
      setUrl("")
    } catch (e) {
      console.error(e)
      setWarning("Have been a problem")
      setTimeout(() => setWarning(""), 3000)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs))
      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      setUsername("")
      setPassword("")
    } catch (error) {
      console.error(error)
      setWarning("Wrong credentials")
      setTimeout(() => setWarning(""), 3000)
    }
  }
  return (
    <div>
      <Message message={message} warning={warning} />
      {user === null ? (
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <Blogs
          blogs={blogs}
          user={user}
          setUser={setUser}
          title={title}
          url={url}
          setTitle={setTitle}
          setUrl={setUrl}
          handleCreate={handleCreate}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setWarning={setWarning}
        />
      )}
    </div>
  )
}

export default App
