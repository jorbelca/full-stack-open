import { useQuery } from "@apollo/client"
import SetBirthyear from "./SetBirthyear"
import { ALL_AUTHORS } from "./GraphQL/queries"
import { useState } from "react"
import Notify from "./Notify"

const Authors = (props) => {
  const { data, error, loading } = useQuery(ALL_AUTHORS)
  const [errorMessage, setErrorMessage] = useState(null)

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 3000)
  }

  const authors = []
  if (data) {
    data.allAuthors.map((n) => authors.push(n))
  }

  if (!props.show) {
    return null
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SetBirthyear notifyError={notifyError} authors={authors} />
      </div>
    </>
  )
}

export default Authors
