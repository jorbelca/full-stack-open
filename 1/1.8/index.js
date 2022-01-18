import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, bad, neutral }) => {
  const All = () => good + bad + neutral

  return (
    <>
      <p>Good : {good}</p>
      <p>Neutral : {neutral}</p>
      <p>Bad : {bad}</p>
      <p>
        All : <All />
      </p>
      <p> Average : {(good + bad - neutral) / (good + bad + neutral)}</p>
      <p>Positive : {(good / (good + bad + neutral)) * 100} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h3>Give Feedback</h3>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <h4>Statistics</h4>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
