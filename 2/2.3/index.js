import React from "react"
import ReactDOM from "react-dom"

const Header = (props) => {
  return <h1>{props.name}</h1>
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
const Content = ({ parts }) => {
  return (
    <>
      <Part key={parts.id} parts={parts} />
    </>
  )
}
const Total = ({ parts }) => {
  let sum = []
  parts.map((part) => sum.push(part.exercises))

  const total = sum.reduce((s, p) => {

    return s + p
  })

  return (
    <>
      {" "}
      <strong>
        Total of
        {total} exercises
      </strong>
    </>
  )
}

// ;(props) => {
//   return (
//     <>
//       <div>
//         <>
//           {props.parts[0].exercises +
//             props.parts[1].exercises +
//             props.parts[2].exercises}
//         </>
//       </div>
//     </>
//   )
// }

const Course = ({ course }) => {
  return (
    <>
      <Header {...course} />
      <Content {...course} />
      <Total {...course} />
    </>
  )
}

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
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById("root"))
