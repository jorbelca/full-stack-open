require("dotenv").config()

let URL = ""

if (process.env.MONGO_URI) {
  URL =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGO_URI
      : process.env.MONGO_URI
} else {
  URL = "mongodb://localhost/bloglist"
}

module.exports = URL
