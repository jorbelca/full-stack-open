const Blog = require("../models/blog")

const initialPublications = [
  {
    title: "Prueba1",
    author: "YO",
    url: "jjjj",
    likes: 3,
    id: "61f7a46836eb4946ed6ea8dd",
  },
  {
    title: "Prueba2",
    author: "YOEL",
    url: "jjjjss",
    likes: 33,
    id: "61f7a76837918d6129352a8a",
  },
]

const publicationsInDB = async () => {
  const publications = await Blog.find({})
  return publications.map((entry) => entry.toJSON())
}

module.exports = {
  initialPublications,
  publicationsInDB,
}
