import React from 'react'
import CoursePart from '../App'

const Total = ({courseParts}:{courseParts:CoursePart}) => {
  return (
    <div>
    <p>
      <b>
    Number of exercises: {" "}
    {courseParts.reduce((carry:number, part:CoursePart) => carry + part.exerciseCount, 0)}</b>
  </p>
    </div>
  )
}

export default Total