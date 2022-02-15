import { connect } from "react-redux"
import { createAn } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdotForm = (props) => {
  const addAn = (ev) => {
    ev.preventDefault()
    const content = ev.target.anecdote.value
    ev.target.anecdote.value = ""
    props.createAn(content)
    props.setNotification(`You have created: ${content}`, 3)
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

export default connect(null, { createAn, setNotification })(AnecdotForm)
