import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../reducers/userReducer"

function LoggedIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return (
    <h5>
      {user.name} logged in{" "}
      <button
        className="button is-danger is-light is-small is-outlined is-rounded"
        onClick={() => {
          window.localStorage.removeItem("loggedUser")
          dispatch(removeUser(null))
          navigate("/")
        }}
      >
        Logout
      </button>
    </h5>
  )
}

export default LoggedIn
