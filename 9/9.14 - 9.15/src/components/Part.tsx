import {assertNever} from '../helpers/helpers'


const Part = ({courseParts}:{courseParts:any}):any => {
courseParts.forEach((p:any) => {
    switch(p.name){
        case"Fundamentals":
         break;
        case"Advanced": break;
        case"Using props to pass data": break;
        case"Deeper type usage":console.log(); break;
        case"Backend development": break;
        default: return assertNever(p)
    }
})
return(
courseParts.map((n:any) => <div key={Math.random()}><p key={n.name}><b>{n.name} : {n.exerciseCount}</b></p> 
<i><p>{n.description}</p></i>
{n.groupProjectCount ? <p>Project exercises : {n.groupProjectCount}</p>: ''}
{n.exerciseSubmissionLink ? <p>Submit to : {n.exerciseSubmissionLink}</p>:''}
{n.requirements ?  <p key={n}>Required Skills:{n.requirements.map((n:any)=> ` ${n} , `)}</p> : ""}
</div>))
}

export default Part