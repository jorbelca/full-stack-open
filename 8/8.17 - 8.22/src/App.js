import { useApolloClient } from "@apollo/client"
import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"

const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 3000)
  }
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => logout()}>Logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} notifyError={notifyError} />

      <Books show={page === "books"} notifyError={notifyError} />

      <NewBook show={page === "add"} notifyError={notifyError} />

      <Login
        show={page === "login"}
        notifyError={notifyError}
        setToken={setToken}
      />
    </div>
  )
}

export default App
