const http = require("http")

const app = require("./app")

const server = http.createServer(app)

const PORT = 3030

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
