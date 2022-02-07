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
        try {
          e.preventDefault()

          const filtredBlog = blogs.filter((item) => item.id === blog.id)
          const updatedLikes = {
            ...filtredBlog,
            likes: (filtredBlog[0].likes += 1),
          }
          blogService.updateBlog(user.token, blog.id, updatedLikes[0])

          setBlogs([...blogs])
        } catch (e) {
          console.error(e)
        }
      }}
    >
      Like
    </button>
  )
}

export default LikeBtn
