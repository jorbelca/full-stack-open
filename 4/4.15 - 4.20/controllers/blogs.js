const blogsRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

require("express-async-errors")

const getToken = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })

  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  if (request.body.title === "" || request.body.url === "") {
    response.status(400).return("Bad request")
  } else {
    const { title, author, url, likes, userId } = request.body
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(400).json({ error: "Token missing or invalid" })
    }
    let user

    if (!userId || userId == "") {
      user = await User.find({})
      user = user[0]
    } else {
      user = await User.findById(decodedToken.id)
    }

    const nameToken = await User.findById(decodedToken.id)

    const blog = new Blog({
      title,
      author: token ? nameToken.name : author,
      url,
      likes: likes === "" ? 0 : likes,
      user: user._id,
    })

    const result = await blog.save()
    // GUARDAR BLOGS USUARIO

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params
  const updateBlog = {
    likes: request.body.likes,
  }

  const update = await Blog.findByIdAndUpdate(id, updateBlog)
  response.json(update)
})
module.exports = blogsRouter
