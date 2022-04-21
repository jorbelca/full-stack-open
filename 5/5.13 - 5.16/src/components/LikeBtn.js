import blogService from "../services/blogService"
import React from "react"

const LikeBtn = ({ blog, user, setBlogs, blogs, test }) => {
  const stylesLike = {
    marginLeft: 10,
    backgroundColor: "lightblue",
    borderRadius: 6,
  }

  return (
    <button
      className="likeBtn"
      data-testid="likeBtn"
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
          console.error(e.message)
        }
      }}
    >
      Like
    </button>
  )
}

export default LikeBtn

// LikeBtn.Types = {
//   blog: propTypes.object.isRequired,
//   setBlogs: propTypes.func.isRequired,
//   user: propTypes.object.isRequired,
//   blogs: propTypes.array.isRequired,
// }
