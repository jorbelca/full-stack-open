const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")
require("express-async-errors")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  })

  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "The password must have at least 3 characters of length" })
  }
  // ENCRIPTING PASSWORD
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    name,
    username,
    passwordHash,
  })

  const savedUser = await newUser.save()
  response.json(savedUser)
})

module.exports = usersRouter
