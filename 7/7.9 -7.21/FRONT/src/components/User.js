import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const User = () => {
  const { id } = useParams((n) => n.id)
  const users = useSelector((state) => state.users)
  const user = users.find((n) => n.id === id)

  return (
    <>
      <h2>{user.name}</h2>
      <h5>Added Blogs</h5>

      {user.blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <li key={blog.id}>{blog.title}</li>
        </Link>
      ))}
    </>
  )
}

export default User
