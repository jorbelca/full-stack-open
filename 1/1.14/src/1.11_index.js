import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => {
  if (text === "Positive ") {
    return (
      <>
        <thead>
          <tr>
            <th>{text}:</th>
            <th>{value}%</th>
          </tr>
        </thead>
      </>
    )
  } else {
    return (
      <>
        <thead>
          <tr>
            <th>{text}:</th>
            <th>{value}</th>
          </tr>
        </thead>
      </>
    )
  }
}

const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) {
    return "No data "
  } else {
    return (
      <table style={{ border: "1px solid black" }}>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={good + bad + neutral} />
        <Statistic
          text="Average "
          value={(good + bad - neutral) / (good + bad + neutral)}
        />
        <Statistic
          text="Positive "
          value={(good / (good + bad + neutral)) * 100}
        />
      </table>
    )
  }
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
