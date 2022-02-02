const blogsRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")

require("express-async-errors")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1 })

  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  if (request.body.title === "" && request.body.url === "") {
    response.status(400).return("Bad request")
  } else {
    const { title, author, url, likes, userId } = request.body

    const user = await User.findById(userId)

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === "" ? 0 : likes,
      user: user._id,
    })

    const result = await blog.save()
    // GUARDAR BLOGS USUARIO
    console.log(result._id)
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
