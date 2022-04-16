const mongoose = require("mongoose")

const url = process.env.MONGO_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB", e.message)
  })