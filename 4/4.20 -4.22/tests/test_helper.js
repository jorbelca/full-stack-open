const Blog = require("../models/blog")
const User = require("../models/user")

const initialPublications = [
  {
    title: "Prueba1",
    author: "YO",
    url: "jjjj",
    likes: 3,
    id: "61f7a46836eb4946ed6ea8dd",
  },
]

const initialUsers = [
  {
    name: "Pepe",
    username: "Pepito",
    password: "123456",
  },
  
]
const publicationsInDB = async () => {
  const publications = await Blog.find({})
  return publications.map((entry) => entry.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((entry) => entry.toJSON())
}

module.exports = {
  initialPublications,
  publicationsInDB,
  usersInDB,
  initialUsers,
}
