import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Comments from "./Comments"
import DeleteBtn from "./DeleteBtn"
import LikeBtn from "./LikeBtn"

const Blog = () => {
  const { id } = useParams((n) => n.id)

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((n) => n.id === id)

  console.log(blogs)
  console.log(blog)
  
  return (
    <>
      <div className="blog box">
        Title: {blog.title}
        <br />
        Author: {blog.author}
        <br />
        URL: {blog.url}
        <br />
        Likes: {blog.likes}
        <LikeBtn blog={blog} />
        <br />
        <DeleteBtn blog={blog} />
        <br />
        <br />
        <Comments />
      </div>
    </>
  )
}

export default Blog
