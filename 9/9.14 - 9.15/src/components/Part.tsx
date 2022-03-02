import {assertNever} from '../helpers/helpers'
import CoursePart from '../App'

const Part = ({courseParts}:{courseParts: CoursePart}): CoursePart => {
courseParts.forEach(p => {
    switch(p.name){
        case"Fundamentals":
         break;
        case"Advanced": break;
        case"Using props to pass data": break;
        case"Deeper type usage": break;
        case"Backend development": break;
        default: return assertNever(p)
    }
})
return(
courseParts.map((n:CoursePart) => <div key={Math.random()}><p key={n.name}><b>{n.name} : {n.exerciseCount}</b></p> 
<i><p>{n.description}</p></i>
{n.groupProjectCount ? <p>Project exercises : {n.groupProjectCount}</p>: ''}
{n.exerciseSubmissionLink ? <p>Submit to : {n.exerciseSubmissionLink}</p>:''}
{n.requirements ?  <p key={n}>Required Skills:{n.requirements.map((n:CoursePart)=> ` ${n} , `)}</p> : ""}
</div>))
}

export default Part