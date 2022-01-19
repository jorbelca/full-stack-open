import React from 'react'

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

export default Course
