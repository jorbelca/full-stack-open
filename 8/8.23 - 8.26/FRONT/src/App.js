import { useApolloClient, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import { BOOK_ADDED } from "./components/GraphQL/mutations"
import { ALL_BOOKS } from "./components/GraphQL/queries"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import Recomendations from "./components/Recomendations"
import { updateCache } from "./Helpers/updateCache"

const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 10000)
  }
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useEffect(() => {
    const token = localStorage.getItem("userToken")
    setToken(token)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const bookAdd = subscriptionData.data.bookAdded
      window.alert(`The book ${bookAdd.title} has been added`)

      updateCache(client.cache, { query: ALL_BOOKS }, bookAdd)
    },
  })
  return (
    <>
      <div>
        <Notify errorMessage={errorMessage} />
      </div>
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          {!token ? (
            <button onClick={() => setPage("login")}>Login</button>
          ) : (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => setPage("recomendations")}>
                recomendations
              </button>
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
        {token ? (
          <Recomendations
            show={page === "recomendations"}
            notifyError={notifyError}
          />
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default App
