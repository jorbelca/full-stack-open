const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
const User = require("../models/user")
const Blog = require("../models/blog")

require("express-async-errors")

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({}).populate("blog", {
    blog: 1,
  })

  response.json(comments)
})

commentsRouter.post("/", async (request, response) => {
  if (request.body.title === "" || request.body.url === "") {
    response.status(400).return("Bad request")
  } else {
    const { content, blogId, userId } = request.body

    // if (!userId || userId == "") {
    //   user = await User.find({})
    //   user = user[0]
    // } else {
    //   user = await User.findById(userId)
    // }

    // const nameToken = await User.findById(userId)
    const blog = await Blog.findById(blogId)

    const comment = new Comment({
      content,
      author: userId,
      blog: blogId,
    })

    const result = await comment.save()
    // GUARDAR BLOGS USUARIO

    blog.comments = blog.comments.concat(result._id)
    await blog.save()

    response.status(201).json(result)
  }
})

module.exports = commentsRouter
