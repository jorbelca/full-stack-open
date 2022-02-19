import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table className="table">
        <tbody>
          <>
            <td>
              <thead>
                <th>Users</th>
              </thead>
              {users.map((user) => (
                <tr key={user.id}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </tr>
              ))}
            </td>
            <td>
              <thead>
                <th>Blogs created</th>
              </thead>
              {users.map((user) => (
                <tr>{user.blogs.length}</tr>
              ))}
            </td>
          </>
        </tbody>
      </table>
    </div>
  )
}

export default Users
