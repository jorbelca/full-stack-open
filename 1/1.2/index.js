import React from "react"
import ReactDOM from "react-dom"

const Header = (props) => {
  return <h1>{props.course}</h1>
}
const Part = ({ part1, exercises1, part2, exercises2, part3, exercises3 }) => {
  return (
    <>
      {part1}
      {exercises1}
      {part2}
      {exercises2}
      {part3}
      {exercises3}
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part1={props.part1} exercises1={props.exercises1} />
      <br />
      <Part part2={props.part2} exercises2={props.exercises2} />
      <br />
      <Part part3={props.part3} exercises3={props.exercises3} />
    </>
  )
}
const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
