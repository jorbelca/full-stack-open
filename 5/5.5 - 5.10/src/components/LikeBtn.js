import blogService from "../services/blogService"

const LikeBtn = ({ blog, user, setBlogs, blogs }) => {
  const stylesLike = {
    marginLeft: 10,
    backgroundColor: "lightblue",
    borderRadius: 6,
  }
  return (
    <button
      style={stylesLike}
      onClick={(e) => {
        e.preventDefault()
        // debugger
        const filtredBlog = blogs.filter((item) => item.id === blog.id)
        const updatedLikes = {
          ...filtredBlog,
          likes: (filtredBlog[0].likes += 1),
        }
        blogService.updateBlog(user.token, blog.id, updatedLikes[0])
        setTimeout(() => setBlogs(blogs), 300)
        console.log(blogs)
      }}
    >
      Like
    </button>
  )
}

export default LikeBtn
