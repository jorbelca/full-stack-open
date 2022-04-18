const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (publications) => {
  let likes = 0
  publications.map((content) => (likes += content.likes))
  return Number(likes)
}
const favouriteBlog = (blogs) => {
  let likes = []
  blogs.map((content) => likes.push(content.likes))
  const max = Math.max(...likes)
  const f = likes.indexOf(max)
  const final = {
    author: `${blogs[f].author}`,
    likes: Number(`${blogs[f].likes}`),
    title: `${blogs[f].title}`,
  }

  return final
}
const mostBlogs = (blogs) => {
  const authors = _.mapValues(blogs, "author")
  const order = _.countBy(authors, ["author", "blogs"]["asc"])
  const r = _.mapValues(order)
  const finale = (r) => {
    let author = Object.keys(r).slice(-1)[0]
    let values = Object.values(r).slice(-1)[0]
    return { author: author, blogs: values }
  }
  return finale(r)
}

const mostLikes = (blogs) => {
  const authors = _.mapValues(blogs, (blog) => {
    return { author: blog.author, likes: blog.likes }
  })
  const finale = _.orderBy(authors, (item) => item.likes, ["desc"])
  return finale[0]
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
