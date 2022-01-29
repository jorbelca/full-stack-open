const mongoose = require("mongoose")

const url = process.env.MONGO_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB", e.message)
  })

process.on("uncaughtException", () => {
  mongoose.connection.disconnect()
})
