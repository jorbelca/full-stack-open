import { connect } from "react-redux"
import { voteAn } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const btnStyle = {
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 3,
    color: "navy",
    backgroundColor: "lightgrey",
    borderRadius: 5,
  }
  const singleAn = {
    margin: 6,
    padding: 5,
    border: "1px solid grey",
    borderRadius: 12,
  }

  return props.anecdotes.map((anecdote) => (
    <div style={singleAn} key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        Has {anecdote.votes} votes
        <button
          style={btnStyle}
          onClick={() => {
            props.voteAn(anecdote)
            props.setNotification(`You have liked: ${anecdote.content}`, 3)
          }}
        >
          Vote
        </button>
      </div>
    </div>
  ))
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
      .map((anecdote) => anecdote)
      .filter(
        (anecdote) => anecdote.content.toLowerCase().indexOf(state.filter) >= 0
      )
      .sort((a, b) => (b.votes > a.votes ? 1 : -1)),
  }
}

const mapDispatchToProps = { voteAn, setNotification }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
