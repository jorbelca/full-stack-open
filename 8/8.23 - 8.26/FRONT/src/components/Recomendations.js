import { useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { ALL_BOOKS, ME } from "./GraphQL/queries"

function Recomendations({ show, notifyError }) {
  const [favorite, setFavorite] = useState("")
  const [books, setBooks] = useState("")

  const queryBooks = useQuery(
    ALL_BOOKS,
    { variables: { genre: favorite } },
    {
      onError: (error) => {
        console.log(error)
        notifyError(error.graphQLErrors[0].message)
      },
    }
  )

const { data } = useQuery(ME)
 
  useEffect(() => {
    if (data === undefined) {
      setFavorite("")
    } else {
      setFavorite(data.me.favoriteGenre)
    }
  }, [data, favorite])

  useEffect(() => {
    if (queryBooks.data) setBooks(queryBooks.data.allBooks)
  }, [queryBooks])
  
  if (!show) return null
  return (
    <div>
      <h2>Recomendations</h2>

      <p>
        Books in your favorite genre <b>{favorite}</b>
      </p>

      <div>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {books.map((b) => (
                <>
              <tr key={b.id}></tr>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recomendations
