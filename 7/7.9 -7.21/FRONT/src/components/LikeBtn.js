import blogService from "../services/blogService"
import { useDispatch, useSelector } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"
import { updateLikesReducer } from "../reducers/blogsReducer"

const LikeBtn = ({ blog }) => {
  const user = useSelector((state) => state.user)

  const blogsA = useSelector((state) => state.blogs)
  const blogs = blogsA.map((n) => n)
  const dispatch = useDispatch()

  return (
    <button
      className="button is-info is-outlined is-small ml-5 mb-2"
      onClick={(e) => {
        try {
          e.preventDefault()
          const filtredBlog = blogs.find((item) => item.id === blog.id)

          blogService.updateBlog(user.token, filtredBlog)

          dispatch(updateLikesReducer(blog.id))

          dispatch(setNotification(`You have voted for ${filtredBlog.title} `))
          setTimeout(() => dispatch(removeNotification()), 3000)
        } catch (error) {
          console.error(error)

          dispatch(setWarning("There is a problem"))
          setTimeout(() => dispatch(removeWarning()), 3000)
        }
      }}
    >
      <span className="icon is-small">
        <i className="fa-solid fa-thumbs-up"></i>
      </span>
      <span>Vote</span>
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
