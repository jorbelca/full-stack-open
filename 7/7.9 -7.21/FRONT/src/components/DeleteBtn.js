import blogService from "../services/blogService"
import React from "react"
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"

const DeleteBtn = ({ blogs, user, blog, setBlogs }) => {
  const dispatch = useDispatch()

  const stylesDelete = {
    backgroundColor: "red",
    color: "white",
    borderColor: "white",
    borderRadius: 8,
    padding: 2,
    marginRight: 10,
  }

  return (
    <button
      style={stylesDelete}
      onClick={(e) => {
        e.preventDefault()
        try {
          const filtredData = blogs.filter((item) => item.id !== blog.id)
          if (window.confirm`Do you want to delete the message`) {
            blogService.deleteBlog(user.token, blog.id)
            setBlogs(filtredData)
            dispatch(setNotification("Deleted"))
            setTimeout(() => dispatch(removeNotification()), 3000)
          }
        } catch (error) {
          console.error(error)
          dispatch(setWarning("There is a problem"))
          setTimeout(() => dispatch(removeWarning()), 3000)
        }
      }}
    >
      Delete
    </button>
  )
}

export default DeleteBtn
