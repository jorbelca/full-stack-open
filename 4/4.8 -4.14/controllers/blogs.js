const blogsRouter = require("express").Router()

const Blog = require("../models/blog")
require("express-async-errors")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  let blog

  if (request.body.likes === "") {
    blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0,
    })
  } else if (request.body.title === "" && request.body.url === "") {
    response.status(400).return("Bad request")
  } else {
    blog = new Blog(request.body)
  }
  const result = await blog.save()
  response.status(201).json(result)
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
