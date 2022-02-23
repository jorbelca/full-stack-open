import { ApolloServer, gql } from "apollo-server"
import mongoose from "mongoose"
import "dotenv/config"
import Author from "./models/Author.js"
import Book from "./models/Book.js"

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
    author: Author!
    id: ID!
    genres: [String!]!
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
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    // allBooks: (root, arg) => {
    //   const { author, genre } = arg
    //   if (!author) {
    //     console.log(genre)
    //     return books.filter((n) => n.genres.find((m) => m === arg.genre))
    //   } else if (author && genre) {
    //     console.log("all")
    //     return books
    //       .filter((n) => n.genres.find((m) => m === arg.genre))
    //       .filter((n) => n.author === arg.author)
    //   }
    // },
    allBooks: async (root, arg) => {
      return Book.find({})
    },
    allAuthors: async (root, arg) => {
      return Author.find({})
    },
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
        const author = { name: args.author, born: args.born }
        authors = authors.concat(author)

        const book = {
          author: args.author,
          title: args.title,
          published: args.published,
          genres: [args.genres],
        }
        books = books.concat(book)
        return book
      }
      const book = { ...args }
      books = books.concat(book)
      return book
    },

    addAuthor: (root, args) => {
      if (!args.born) {
        args.born = null
      }
      const author = { ...args }
      authors = authors.concat(author)
      return author
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name)

      if (!author) {
        return error
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))

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

const URL = process.env.MONGO_URI

console.log("Connecting to ", URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((e) => {
    console.log("Error connecting to MongoDb", e.message)
  })
