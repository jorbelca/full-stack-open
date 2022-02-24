import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const tokenLink = setContext(({ headers }) => {
  const token = localStorage.getItem("userToken")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const URI = new HttpLink({
  uri: "http://localhost:4000",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: tokenLink.concat(URI),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
