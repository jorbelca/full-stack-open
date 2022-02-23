import { ApolloServer, gql } from "apollo-server"
import { UserInputError } from "apollo-server-core"
import Author from "./models/Author.js"
import Book from "./models/Book.js"
import User from "./models/User.js"
import "./db.js"
import jwt from "jsonwebtoken"

const typeDefs = gql`
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
    bookCount: Int
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
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),

    allBooks: async (root, arg) => {
      const { author, genre } = arg

      if (author && genre) {
        const author = await Author.find({ name: arg.author })

        return Book.find({ author: author[0].id, genres: genre })
      }
      if (author) {
        const author = await Author.find({ name: arg.author })

        return Book.find({ author: author[0].id })
      }
      if (genre) {
        return Book.find({ genres: arg.genre })
      }

      return Book.find({}).populate("author")
    },

    allAuthors: async (root, arg) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    //NO VA
    bookCount: async (root, arg) => {
      ;("bookCount:")
      const books = await Book.findOne({}).populate("author")

      console.log(
        books.foreach((p) => {
          console.log(p.author.name)
          console.log(root.name)
          p.author.name === root.name
        })
      )

      return books
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        newAuthor.born = null
        try {
          await newAuthor.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }

        const book = new Book({ ...args, author: newAuthor.id })
        try {
          return await book.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }
      }
      if (author) {
        const book = new Book({ ...args })
        try {
          return await book.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }
      }
    },

    addAuthor: async (root, args) => {
      if (!args.born) {
        args.born = null
      }
      const author = new Author({ ...args })
      try {
        return await author.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return
      }

      author.born = args.setBornTo

      try {
        return await author.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        password: args.password,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== user.password) {
        throw new UserInputError("Wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, SECRET),
      }
    },
  },
}
const SECRET = process.env.SECRET

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7)
      const { id } = jwt.verify(token, SECRET)
      const currentUser = await User.findById(id)

      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
