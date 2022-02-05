import blogService from "../services/blogService"

const Blog = ({ blog, user, setBlogs, blogs, setMessage, setWarning }) => (
  <>
    <div>
      {blog.title} {blog.author} {blog.likes}{" "}
      <button
        onClick={(e) => {
          try {
            e.preventDefault()
            const filtredData = blogs.filter((item) => item.id !== blog.id)

            setBlogs(filtredData)
            blogService.deleteBlog(user.token, blog.id)
            setMessage(`Deleted`)
            setTimeout(() => setMessage(""), 4000)
            // setTimeout(
            //   () =>
            //     blogService.getAll(user.token).then((blogs) => setBlogs(blogs)),
            //   100
            // )
          } catch (e) {
            console.error(e)
            setWarning("Have been a problem")
            setTimeout(() => setWarning(""), 3000)
          }
        }}
      >
        DEL
      </button>
    </div>
    <br />
  </>
)

export default Blog
