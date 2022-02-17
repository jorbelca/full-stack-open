require("dotenv").config()

let URL = ""

if (process.env.NODE_ENV === "test") {
  URL = process.env.TEST_MONGO_URI
} else {
  URL = process.env.MONGO_URI
}
module.exports = URL
