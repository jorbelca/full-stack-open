import { CourseParts } from "../types"
import Part from "./Part"


const Content = ({parts}:CourseParts) => {
  return (
<div>
  {parts.map((part)=>{
    return <Part key={Math.random()} part={part}/>
  
  })}

</div>
  )
}

export default Content



