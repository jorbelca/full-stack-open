const blogsRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")
const { userExtractor } = require("../middleware/middleware")

require("express-async-errors")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })

  response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  if (request.body.title === "" || request.body.url === "") {
    response.status(400).return("Bad request")
  } else {
    const { title, url, likes, userId } = request.body

    let user

    if (!userId || userId == "") {
      user = await User.find({})
      user = user[0]
    } else {
      user = request.user
    }

    const nameToken = request.user.name

    const blog = new Blog({
      title,
      author: nameToken,
      url,
      likes: likes === "" ? 0 : likes,
      user: user._id,
    })

    const result = await blog.save()
    // SAVE BLOGS USER

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  }
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const userId = request.user._id
  const { id } = request.params

  const { user } = await Blog.findById(id)

  if (user.toString() === userId.toString()) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    response.status(401).json("You're not the author ")
  }
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
