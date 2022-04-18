require("dotenv").config()

let URL = ""

if (process.env.MONGODB_URI) {
  URL =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI
} else {
  URL = "mongodb://localhost/bloglist"
}

module.exports = URL
