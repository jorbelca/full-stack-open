import { useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { LOGIN } from "./GraphQL/mutations"

function Login({ show, notifyError, setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      notifyError(error.graphQLErrors[0].message)
    },
  })
  useEffect(() => {
    if (result.data) {
      console.log(result)
      const token = result.data.login.value
      try {
        setToken(token)
        localStorage.setItem("userToken", token)
      } catch (e) {
        notifyError(e)
      }
    }
  }, [result.data]) //eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })

    setUsername("")
    setPassword("")
  }
  if (!show) {
    return null
  }
  return (
    <>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Username</label>{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label>Password</label>{" "}
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default Login
