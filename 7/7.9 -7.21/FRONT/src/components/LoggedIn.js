import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../reducers/userReducer"

function LoggedIn() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return (
    <h5>
      {user.name} logged in{" "}
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedUser")
          dispatch(removeUser(null))
        }}
      >
        Logout
      </button>
    </h5>
  )
}

export default LoggedIn
