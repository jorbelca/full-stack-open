import React from "react"
import ReactDOM from "react-dom"

const Header = (props) => {
  return <h1>{props.course}</h1>
}
const Part = (props) => {
  return (
    <>
      <h4>
        {props.props.parts[0].name} : {props.props.parts[0].exercises}
      </h4>
      <h4>
        {props.props.parts[1].name} : {props.props.parts[1].exercises}
      </h4>
      <h4>
        {props.props.parts[2].name} : {props.props.parts[2].exercises}
      </h4>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part props={props} />
    </>
  )
}
const Total = (props) => {
  return (
    <>
      <div>
        <>
          {props.parts[0].exercises +
            props.parts[1].exercises +
            props.parts[2].exercises}
        </>
      </div>
    </>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
