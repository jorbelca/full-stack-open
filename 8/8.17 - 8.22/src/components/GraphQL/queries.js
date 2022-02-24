import { gql } from "@apollo/client"

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born

      id
    }
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`
