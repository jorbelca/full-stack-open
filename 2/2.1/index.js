import React, { useState } from "react"
import ReactDOM from "react-dom"

const Header = (props) => {
  return <h1>{props.name}</h1>
}
const Part = (props) => {
  console.log(props.parts[0].name)
  return (
    <>
      <h4>
        {props.parts[0].name} : {props.parts[0].exercises}
      </h4>
      <h4>
        {props.parts[1].name} : {props.parts[1].exercises}
      </h4>
      <h4>
        {props.parts[2].name} : {props.parts[2].exercises}
      </h4>
    </>
  )
}
// const Content = (props) => {
//   return (
//     <>
//       <Part props={props} />
//     </>
//   )
// }
// const Total = (props) => {
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
      <Part {...course} />
      {/* <Content {...course} /> */}
      {/* <Total {...course} /> */}
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
    ],
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById("root"))
