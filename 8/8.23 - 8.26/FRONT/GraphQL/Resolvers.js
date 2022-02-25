import { UserInputError } from "apollo-server-core"
import Author from "../models/Author.js"
import Book from "../models/Book.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { PubSub } from "graphql-subscriptions"
import { JWT_SECRET } from "../index.js"
const pubsub = new PubSub()

export const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),

    allBooks: async (root, arg) => {
      const { author, genre } = arg

      if (author && genre) {
        const author = await Author.find({ name: arg.author })

        return Book.find({ author: author[0].id, genres: genre }).populate(
          "author"
        )
      }
      if (author) {
        const author = await Author.find({ name: arg.author })

        return Book.find({ author: author[0].id }).populate("author")
      }
      if (genre) {
        return Book.find({ genres: arg.genre }).populate("author")
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
      const author = await Author.findOne({ name: args.author })

      if (author === null) {
        const newAuthor = new Author({ name: args.author })
        newAuthor.born = null
        try {
          await newAuthor.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }

        const book = new Book({ ...args, author: newAuthor.id }).populate(
          "author"
        )
        const bookSave = new Book({ ...args, author: newAuthor.id })
        try {
          pubsub.publish("BOOK_ADDED", { bookAdded: book })

          await bookSave.save()
          return book
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }
      }
      if (author) {
        const book = new Book({ ...args, author: author.id }).populate("author")
        const bookSave = new Book({ ...args, author: author.id })
        try {
          pubsub.publish("BOOK_ADDED", { bookAdded: book })
          await bookSave.save()
          return book
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
        value: jwt.sign(userForToken, JWT_SECRET),
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
}
