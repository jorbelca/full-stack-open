import DeleteBtn from "./DeleteBtn"
import LikeBtn from "./LikeBtn"
import ToggleButton from "./ToggleButton"

const Blog = ({ blog, user, setBlogs, blogs, setMessage, setWarning }) => {
  console.log(blogs)
  return (
    <>
      <div>
        {blog.title}

        <ToggleButton label={"View"}>
          Author: {blog.author}
          <br />
          Likes: {blog.likes}
          <LikeBtn blog={blog} user={user} setBlogs={setBlogs} blogs={blogs} />
          <br />
          URL: {blog.url}
          <br />
          <br />
          <DeleteBtn
            setWarning={setWarning}
            setMessage={setMessage}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
          />
        </ToggleButton>
      </div>
      <br />
    </>
  )
}

export default Blog
