import blogService from "../services/blogService"
import { useDispatch } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"

const LikeBtn = ({ blog, user, setBlogs, blogs }) => {
  const stylesLike = {
    marginLeft: 10,
    backgroundColor: "lightblue",
    borderRadius: 6,
  }

  const dispatch = useDispatch()
  return (
    <button
      className="likeBtn"
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
          console.log(filtredBlog)
          dispatch(
            setNotification(`You have voted for ${filtredBlog[0].title} `)
          )
          setTimeout(() => dispatch(removeNotification()), 3000)
        } catch (e) {
          console.error(e)
          dispatch(setWarning("There is a problem"))
          setTimeout(() => dispatch(removeWarning()), 3000)
        }
      }}
    >
      Vote
    </button>
  )
}

export default LikeBtn

// LikeBtn.propTypes = {
//   blog: propTypes.object.isRequired,
//   setBlogs: propTypes.func.isRequired,
//   user: propTypes.object.isRequired,
//   blogs: propTypes.array.isRequired,
// }
