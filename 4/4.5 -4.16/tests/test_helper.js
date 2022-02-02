const Blog = require("../models/blog")
const User = require("../models/user")

const initialPublications = [
  {
    title: "Prueba1",
    author: "YO",
    url: "jjjj",
    likes: 3,
    id: "61f7a46836eb4946ed6ea8dd",
    userId:"61fad424f5cce0526345c8bf"
  },
  {
    title: "Prueba2",
    author: "YOEL",
    url: "jjjjss",
    likes: 33,
    id: "61f7a76837918d6129352a8a",
  },
]

const initialUsers = [
  {
    name: "Pepe",
    username: "Pepito",
    password: 123456,

  },
  {
    name: "Juan",
    username: "Juanito",
    password: 122226,
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
