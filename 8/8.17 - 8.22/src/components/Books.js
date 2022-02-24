import { useQuery, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "./GraphQL/queries"

const Books = ({ show, notifyError }) => {
  const [genre, setGenre] = useState("")
  const [rBooks, setRBooks] = useState([])

  const { data } = useQuery(ALL_BOOKS)

  const [filtered, { data: filter }] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error)
      notifyError(error.graphQLErrors[0].message)
    },
  })

  console.log(filter)

  useEffect(() => {
    if (filter) setRBooks(filter.allBooks)
  }, [filter])

  useEffect(() => {
    if (data) {
      setRBooks(data.allBooks)
    }
  }, [data])

  const ge = []
  if (rBooks) {
    rBooks.map((n) => n.genres.map((g) => ge.push(g)))
  }

  const genres = [...new Set(ge)]

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Books</h2>
      <p>
        In genre <b>{genre}</b>
        {"  "}
        <button onClick={() => filtered()}>Clean</button>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {rBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((e) => (
          <button
            key={e + "1"}
            value={e}
            onClick={({ target }) => {
              filtered({ variables: { genre: target.value } })
            }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
