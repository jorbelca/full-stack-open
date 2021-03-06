import { ApolloServer, gql } from "apollo-server"
import { v1 as uuid } from "uuid"

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]
  }
  type Query {
    authorCount: Int!
    bookCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]
      id: ID
    ): Book
    addAuthor(name: String!, id: ID, born: Int): Author
    editAuthor(name: String!, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      const { author, genre } = args
      if (!author && !genre) {
        return books
      }

      let filteredAuth = []
      if (author) {
        filteredAuth = books.filter((book) => book.author === author)
      }
      let filterGenre = []
      if (genre) {
        filterGenre = books.filter((book) => book.genres.includes(genre))
      }
      return [...filteredAuth, ...filterGenre]
    },

    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      "bookCount:"
      return books.filter((p) => p.author === root.name).length
    },
  },

  Mutation: {
    addBook: (root, args) => {
      if (authors.find((p) => p.name !== args.author)) {
        if (!args.born) {
          args.born = null
        }
        const author = { name: args.author, born: args.born, id: uuid() }
        authors = authors.concat(author)

        const book = {
          author: args.author,
          title: args.title,
          published: args.published,
          genres: args.genres,
          id: uuid(),
        }
        books = books.concat(book)
        return book
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },

    addAuthor: (root, args) => {
      if (!args.born) {
        args.born = null
      }
      const author = { ...args, id: uuid() }
      authors = authors.concat(author)
      return author
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name)
      if (!author || !args.name) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) =>
        a.name !== updatedAuthor.name ? a : updatedAuthor
      )
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
