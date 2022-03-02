import React from 'react'
import Part from "./Part"

const Content = ({courseParts}:{courseParts:any}) => {
  return (
<div>
<Part key={Math.random()} courseParts={courseParts}/>
</div>
  )
}

export default Content



