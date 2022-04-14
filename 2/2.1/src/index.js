import React from "react"
import ReactDOM from "react-dom"

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}
const Course = ({ course }) => {
  return (
    <>
      <Header {...course} />
      <Content {...course} />
    </>
  )
}

const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (course) => {
  return <Part {...course} />
}

const Part = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        
        return (
          <p>
            {part.name} : {part.exercises}
          </p>
        )
      })}
    </>
  )
}
ReactDOM.render(<App />, document.getElementById("root"))
