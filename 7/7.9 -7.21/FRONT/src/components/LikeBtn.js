import blogService from "../services/blogService"
import { useDispatch, useSelector } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"
import { updateLikesReducer } from "../reducers/blogsReducer"

const LikeBtn = ({ blog, }) => {
  const stylesLike = {
    marginLeft: 10,
    backgroundColor: "lightblue",
    borderRadius: 6,
  }
  const user = useSelector((state) => state.user)

  const blogsA = useSelector((state) => state.blogs)
  const blogs = blogsA.map((n) => n)
  const dispatch = useDispatch()

  return (
    <button
      className="likeBtn"
      style={stylesLike}
      onClick={(e) => {
        try {
          e.preventDefault()

          const filtredBlog = blogs.find((item) => item.id === blog.id)

          blogService.updateBlog(user.token, filtredBlog)

          dispatch(updateLikesReducer(blog.id))
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
