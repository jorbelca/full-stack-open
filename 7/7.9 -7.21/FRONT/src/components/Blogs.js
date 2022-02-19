import { useRef, useState } from "react"
import ToggleButton from "./ToggleButton"

import blogService from "../services/blogService"
import Create from "./Create"
import { Link } from "react-router-dom"

import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import { createBlogReducer } from "../reducers/blogsReducer"

const Blogs = () => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const user = useSelector((state) => state.user)

  const blogsA = useSelector((state) => state.blogs)

  const blogs = blogsA.map((n) => n)

  const dispatch = useDispatch()
  const createRef = useRef()
  const handleCreate = (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: title,
        url: url,
        author: user.name,
        likes: "",
      }
      blogService
        .createBlog(user.token, newBlog)
        .then((response) => dispatch(createBlogReducer(response)))

      dispatch(
        setNotification(
          `The new Blog ${title} by ${user.name} has been created`
        )
      )
      setTimeout(() => dispatch(removeNotification()), 3000)
      setTitle("")
      setUrl("")
      createRef.current.toggleVisibility()
    } catch (e) {
      console.error(e)
      dispatch(setWarning("Have been a problem"))
      setTimeout(() => dispatch(removeWarning()), 3000)
    }
  }
  return (
    <>
      <ToggleButton label={"Create new Blog"} ref={createRef}>
        <Create
          url={url}
          title={title}
          setTitle={setTitle}
          handleCreate={handleCreate}
          setUrl={setUrl}
        />
      </ToggleButton>

      <div key="01" className="panel">
        <p className="panel-heading">Blogs</p>

        <ul key="00">
          {blogs
            .sort((a, b) => {
              return b.likes - a.likes
            })
            .map((blog) => (
              <Link to={`/blogs/${blog.id}`}>
                <li key={blog.id} className="panel-block">
                  <span className="panel-icon">
                    <i
                      className="fa-solid fa-angle-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                  {blog.title}
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Blogs
