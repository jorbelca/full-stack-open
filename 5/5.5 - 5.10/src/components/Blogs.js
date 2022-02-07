import { useRef, useState } from "react"
import ToggleButton from "./ToggleButton"
import Blog from "./Blog"
import blogService from "../services/blogService"
import Create from "./Create"

const Blogs = ({
  blogs,
  user,
  setUser,

  setBlogs,
  setWarning,
  setMessage,
}) => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

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
      setBlogs(blogs.concat(newBlog))
      setTimeout(
        () => blogService.getAll(user.token).then((blogs) => setBlogs(blogs)),
        500
      )
      setMessage(`The new Blog ${title} by ${user.name} has been created`)
      setTimeout(() => setMessage(""), 4000)
      setTitle("")
      setUrl("")
      createRef.current.toggleVisibility()
    } catch (e) {
      console.error(e)
      setWarning("Have been a problem")
      setTimeout(() => setWarning(""), 3000)
    }
  }
  return (
    <>
      <h5>
        {user.name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedUser")
            setUser(null)
          }}
        >
          Logout
        </button>
      </h5>

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
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
            setWarning={setWarning}
          />
        ))}
    </>
  )
}

export default Blogs
