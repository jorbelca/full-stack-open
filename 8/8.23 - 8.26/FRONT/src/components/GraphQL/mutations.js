import { gql } from "@apollo/client"

export const MODIFY_BORN = gql`
  mutation editAuthor($name: String!, $fBorn: Int!) {
    editAuthor(name: $name, setBornTo: $fBorn) {
      name
      born
      id
    }
  }
`

export const NEW_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $finPublished: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $finPublished
      genres: $genres
    ) {
      title
      id
      genres
      published
      author {
        name
        id
      }
    }
  }
`

export const LOGIN = gql`
  mutation LOGIN($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      author {
        name
        id
      }
      title
      genres
      published
    }
  }
`
