import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../services/usersService"
import { setUsers } from "../reducers/allUsersReducer"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    getAllUsers(user.token).then((users) => dispatch(setUsers(users)))
  }, [dispatch])

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
