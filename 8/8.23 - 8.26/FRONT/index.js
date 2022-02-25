import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { makeExecutableSchema } from "@graphql-tools/schema"
import express from "express"
import http from "http"
import { resolvers } from "./GraphQL/Resolvers.js"
import { typeDefs } from "./GraphQL/TypeDefs.js"
import User from "./models/User.js"
import "./db.js"
import jwt from "jsonwebtoken"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { execute, subscribe } from "graphql"

export const JWT_SECRET = process.env.SECRET

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscritionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "" }
  )
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const token = auth.substring(7)
        const { id } = jwt.verify(token, JWT_SECRET)
        const currentUser = await User.findById(id)

        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscritionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({ app, path: "/" })

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

startServer()
