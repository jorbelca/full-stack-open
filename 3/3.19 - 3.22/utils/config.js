require("dotenv").config()

const URL = process.env.MONGO_URI
const PORT = process.env.PORT

module.exports = {
  URL,
  PORT,
}
