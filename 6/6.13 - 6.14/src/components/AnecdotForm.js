import { useDispatch } from "react-redux"
import { createAn } from "../reducers/anecdoteReducer"
import { notificationCreate } from "../reducers/notificationReducer"

const AnecdotForm = () => {
  const dispatch = useDispatch()

  const addAn = (ev) => {
    ev.preventDefault()
    const content = ev.target.anecdote.value
    ev.target.anecdote.value = ""
    dispatch(createAn(content))
    dispatch(notificationCreate(content))
  }

  const form = {
    marginLeft: 8,
    display: "flex",
  }
  const formBtn = {
    marginLeft: 20,
    borderRadius: 8,
    paddingBottom: 1.2,
  }
  return (
    <>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAn}>
        <div style={form}>
          <div>
            <input name="anecdote" type="text" />
          </div>
          <div>
            <button style={formBtn} type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AnecdotForm
