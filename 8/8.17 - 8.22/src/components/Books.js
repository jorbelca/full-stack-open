import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "./GraphQL/queries"

const Books = ({ show }) => {
  const [genre, setGenre] = useState("")
  const [books, setBooks] = useState([])

  const { data } = useQuery(ALL_BOOKS, { variables: {} })

  useEffect(() => {
    if (data) {
      console.log(data.allBooks)
      data.allBooks.map((n) => setBooks(n))
    }
  }, [])

  console.log(books)
  // if (books) {  console.log(books)
  //   books.map((n) => n.genres.map((g) => ge.push(g)))
  // }
  // const ge = []
  // const genres = [...new Set(ge)]

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Books</h2>
      <p>
        In genre <b>{genre}</b>
        {"  "}
        <button onClick={() => setGenre("")}>Clean</button>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genre == ""
            ? books.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books
                .filter((n) => n.genres == genre)
                .map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
      {/* <div>
        {genres.map((e) => (
          <button
            key={e + "1"}
            value={e}
            onClick={({ target }) => setGenre(target.value)}
          >
            {e}
          </button>
        ))}
      </div> */}
    </div>
  )
}

export default Books
