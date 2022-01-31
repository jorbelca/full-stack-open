const mongoose = require("mongoose")
const express = require("express")
const app = express()
const cors = require("cors")
const URL = require("./utils/config")
const blogsRouter = require("./controllers/blogs")

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
app.use("/api/blogs", blogsRouter)

module.exports = app
