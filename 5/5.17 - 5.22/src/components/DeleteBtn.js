import blogService from "../services/blogService"
import React from "react"

const DeleteBtn = ({ setWarning, setMessage, blogs, user, blog, setBlogs }) => {
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
            blogService.deleteBlog(user.token, blog.id, setWarning, setMessage)
            setBlogs(filtredData)
          }
        } catch (error) {
          console.error(error)
          setWarning("Have been a problem")
          setTimeout(() => setWarning(""), 3000)
        }
      }}
    >
      Delete
    </button>
  )
}

export default DeleteBtn
