import { useRef, useState } from "react"
import ToggleButton from "./ToggleButton"
import Blog from "./Blog"
import blogService from "../services/blogService"
import Create from "./Create"
import { Link } from "react-router-dom"

import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { removeWarning, setWarning } from "../reducers/warningReducer"
import { createBlogReducer, setBlogs } from "../reducers/blogsReducer"
import { removeUser } from "../reducers/userReducer"

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
      blogService.createBlog(user.token, newBlog)
      dispatch(createBlogReducer(newBlog))
      // setTimeout(
      //   () => blogService.getAll(user.token).then((blogs) => dispatch(setBlogs(blogs))),
      //   500
      // )
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
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => {
          return b.likes - a.likes
        })
        .map((blog) => (
          <ul>
            <Link to={`/blogs/${blog.id}`}>
              <li>
                {blog.title}
                {/* <Blog key={blog.id} blog={blog} user={user} blogs={blogs} /> */}
              </li>
            </Link>
          </ul>
        ))}
    </>
  )
}

export default Blogs
