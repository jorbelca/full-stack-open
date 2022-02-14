import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { voteAn } from "../reducers/anecdoteReducer"
import { notificationLike } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .map((anecdote) => anecdote)
      .sort((a, b) => (b.votes > a.votes ? 1 : -1))
      .filter((anecdote) => anecdote.content.toLowerCase().indexOf(filter) >= 0)
  )

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAn(anecdote.id))
    dispatch(notificationLike(anecdote.content))
  }

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

  return anecdotes.map((anecdote) => (
    <div style={singleAn} key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        Has {anecdote.votes} votes
        <button style={btnStyle} onClick={() => vote(anecdote)}>
          Vote
        </button>
      </div>
    </div>
  ))
}

export default AnecdoteList
