import { useState } from "react"
import blogService from "../services/blogService"
import loginService from "../services/loginService"
import React from "react"

const Login = ({ setBlogs, setUser, setWarning }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      if (user) {
        setUser(user)
        blogService.getAll(user.token).then((blogs) => setBlogs(blogs))
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        setUsername("")
        setPassword("")
      }
      if (!user) {
        setWarning("Wrong credentials")
        setTimeout(() => setWarning(""), 3000)

        setUsername("")
        setPassword("")
      }
    } catch (error) {
      console.error(error)
      setWarning("Wrong credentials")
      setTimeout(() => setWarning(""), 3000)
    }
  }
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

export default Login
