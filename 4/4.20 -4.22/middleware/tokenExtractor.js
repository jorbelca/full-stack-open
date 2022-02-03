const jwt = require("jsonwebtoken")

const tokenExtractor = (request, response, next) => {
  let token = ""
  const authorization = request.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" })
  }

  const userId = decodedToken.id

  request.body.userId = userId

  next()
}
module.exports = tokenExtractor
