import React from "react"
import ReactDOM from "react-dom"

const Part = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} : {part.exercises}
          </p>
        )
      })}
    </>
  )
}

const Total = ({ courses }) => {
  let sum = []
  courses.map((part) => sum.push(part.exercises))

  const total = sum.reduce((s, p) => {
    return s + p
  })

  return (
    <>
      <strong>
        Total of
        <></> {total} exercises
      </strong>
    </>
  )
}
const Content = ({ courses }) => {
  return (
    <>
      <Part key={courses.parts.id} parts={courses.parts} />
    </>
  )
}
const Header = ({ courses }) => {
  return (
    <>
      <h2 key={courses.id}>{courses.name}</h2>
    </>
  )
}
const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <>
            <Header courses={course}></Header>
            <Content courses={course}></Content>
            <Total courses={course.parts}></Total>
          </>
        )
      })}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <>
      <h1>Web Development Curriculum</h1>
      <Course key={courses.id} courses={courses} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
