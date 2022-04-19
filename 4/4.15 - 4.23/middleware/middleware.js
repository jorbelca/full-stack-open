const User = require("../models/user")
const tokenExtractor = require("./tokenExtractor")

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "You should provide the token " })
  } else {
    response.status(500).end()
  }

  next(error)
}

const userExtractor = async (request, response, next) => {
  const userId = request.body.userId
  const user = await User.findById(userId)

  request.user = user
  next()
}

module.exports = { unknownEndpoint, errorHandler, userExtractor }
