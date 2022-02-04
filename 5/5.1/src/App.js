import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

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
        />
        <br />
        <input
          type="text"
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

const Blogs = ({ blogs }) => {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   blogService.getAll(user.token).then((blogs) => setBlogs(blogs))
  // }, )

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUser(user)
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs))
      setUsername("")
      setPassword("")
    } catch (error) {
      console.error(error)
      console.error("Wrong credentials")
    }
  }
  return (
    <div>
      {user === null ? (
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <Blogs blogs={blogs} />
      )}
    </div>
  )
}

export default App
