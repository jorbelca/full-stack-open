import { gql, useQuery } from "@apollo/client"

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const { data, error, loading } = useQuery(ALL_AUTHORS)

  const authors = []
  if (data) {
    authors.push(data.allAuthors)
  }

  // console.log(data.allAuthors)
  console.log(authors[0].map((a) => a))

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors[0].map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
