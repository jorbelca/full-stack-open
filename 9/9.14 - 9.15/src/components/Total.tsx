import React from 'react'

const Total = ({courseParts}:{courseParts:any}) => {
  return (
    <div>
    <p>
      <b>
    Number of exercises: {" "}
    {courseParts.reduce((carry:any, part:any) => carry + part.exerciseCount, 0)}</b>
  </p>
    </div>
  )
}

export default Total