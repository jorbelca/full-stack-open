import React, { useState } from "react"
import ReactDOM from "react-dom"

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0])

  const selec = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const votar = () => {
    const newVote = [...vote]
    newVote[selected]++
    setVote([...newVote])
  }

  var posicion = vote.indexOf(Math.max(...vote))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <br />

      <p>has {vote[selected]} votes</p>
      <br />
      <p>
        <button onClick={votar}>VOTE</button>
        <button onClick={selec}>NEXT Anectode</button>
      </p>
      <div>
        <h3>Anectode with most votes</h3>
        {anecdotes[posicion]}
        <p>has {Math.max(...vote)} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
