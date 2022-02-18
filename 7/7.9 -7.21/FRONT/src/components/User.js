import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const User = () => {
  const { id } = useParams((n) => n.id)
  const users = useSelector((state) => state.users)
  const user = users.find((n) => n.id === id)

  return (
    <>
      <h3>{user.name}</h3>
      <h5>Added Blogs</h5>
      <ul>
        {user.blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <li>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default User
