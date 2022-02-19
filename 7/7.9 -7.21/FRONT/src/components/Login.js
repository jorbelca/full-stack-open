import { useState } from "react"
import blogService from "../services/blogService"
import loginService from "../services/loginService"
import { useDispatch } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import { setBlogs } from "../reducers/blogsReducer"
import { setUser } from "../reducers/userReducer"

const Login = () => {
  const dispatch = useDispatch()
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
        dispatch(setUser(user))
        blogService
          .getAll(user.token)
          .then((blogs) => dispatch(setBlogs(blogs)))
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        setUsername("")
        setPassword("")
      }
      if (!user) {
        dispatch(setWarning("Wrong credentials"))
        setTimeout(() => dispatch(removeWarning()), 3000)

        setUsername("")
        setPassword("")
      }
    } catch (error) {
      console.error(error)
      setWarning("Wrong credentials")
      setTimeout(() => dispatch(removeWarning()), 3000)
    }
  }

  const formSt = {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    alignContent: "center",
  }
  return (
    <>
      <div style={formSt}>
        <form onSubmit={handleLogin}>
          {" "}
          <label className="label">
            <h2>Login</h2>
          </label>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
              className="input"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                autoComplete="current-username"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
              className="input"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                autoComplete="current-password"
              />

              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button is-success">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
