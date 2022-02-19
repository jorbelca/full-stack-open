import blogService from "../services/blogService"
import React from "react"
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import { deleteteBlogReducer } from "../reducers/blogsReducer"
import { useNavigate } from "react-router-dom"

const DeleteBtn = ({ blog }) => {
  const blogsA = useSelector((state) => state.blogs)
  const blogs = blogsA.map((n) => n)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <button
      className="button is-danger is-outlined is-small"
      onClick={(e) => {
        e.preventDefault()
        try {
          
          
          if (window.confirm`Do you want to delete the message`) {
            blogService.deleteBlog(user.token, blog.id)
            dispatch(deleteteBlogReducer(blog.id))
            dispatch(setNotification("Deleted"))
            setTimeout(() => dispatch(removeNotification()), 3000)
          }
          navigate("/")
        } catch (error) {
          console.error(error)
          dispatch(setWarning("There is a problem"))
          setTimeout(() => dispatch(removeWarning()), 3000)
        }
      }}
    >
      <span>Delete</span>
      <span className="icon is-small">
        <i className="fas fa-times"></i>
      </span>
    </button>
  )
}

export default DeleteBtn
