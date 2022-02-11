import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { voteAn } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAn(id))
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
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div style={singleAn} key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          Has {anecdote.votes} votes
          <button style={btnStyle} onClick={() => vote(anecdote.id)}>
            Vote
          </button>
        </div>
      </div>
    ))
}

export default AnecdoteList
