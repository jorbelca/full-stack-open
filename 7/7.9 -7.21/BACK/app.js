const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
const URL = require("./utils/config")
const tokenExtractor = require("./middleware/tokenExtractor")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
require("dotenv").config()
const { errorHandler } = require("./middleware/middleware")
const testingRouter = require("./controllers/testing")

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB", e.message)
  })

app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use("/api/testing", testingRouter)

app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use(tokenExtractor)
app.use("/api/blogs", blogsRouter)

module.exports = app
