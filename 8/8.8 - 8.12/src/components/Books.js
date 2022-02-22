import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "./GraphQL/queries"

const Books = (props) => {
  const { data, error, loading } = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  const books = []
  if (data) {
    data.allBooks.map((n) => books.push(n))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
