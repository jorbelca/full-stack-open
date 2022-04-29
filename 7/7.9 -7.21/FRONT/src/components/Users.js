import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>Users</th>
            {users.map((user) => (
              <td key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
            ))}
          </tr>

          <tr>
            <th>Blogs created </th>

            {users.map((user) => (
              <td key={user.id}>{user.blogs.length}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users
