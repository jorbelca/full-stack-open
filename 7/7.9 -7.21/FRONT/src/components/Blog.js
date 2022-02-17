import DeleteBtn from "./DeleteBtn"
import LikeBtn from "./LikeBtn"
import ToggleButton from "./ToggleButton"
import React from "react"

const Blog = ({ blog, user, setBlogs, blogs }) => {
  return (
    <>
      <div className="blog">
        {blog.title}

        <ToggleButton label={"View"} id="view">
          Author: {blog.author}
          <br />
          Likes: {blog.likes}
          <LikeBtn blog={blog} user={user} setBlogs={setBlogs} blogs={blogs} />
          <br />
          URL: {blog.url}
          <br />
          <br />
          <DeleteBtn
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
