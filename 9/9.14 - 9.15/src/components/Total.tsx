import React from 'react'


interface TContent {
  name:string;
  exerciseCount: number
}

interface TotalProps{
  parts: TContent[]
}
const Total = ({parts}:TotalProps) => {
  return (
    <div>
    <p>
      <b>
    Number of exercises: {" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </b>
  </p>
    </div>
  )
}

export default Total