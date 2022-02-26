import { gql } from "apollo-server-core"

export const typeDefs = gql`
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    password: String
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Book!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(
      username: String!
      password: String
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`
