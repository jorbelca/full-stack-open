
const target: number = Number(process.argv[2])
let hours: number[] = []

for (let i = 3; i < process.argv.length; i ++){
    hours.push(Number( process.argv[i]))
}


const calculateExercises = (target:number,hours:number[]) => {
 
 public interface Result{
 periodLength: Number,
  trainingDays: Number,
  success: Boolean,
  rating: Number
  ratingDescription: Function,
  target: Number,
  average: Number 
    }
  

    const periodLength = hours.length;
    const trainingDays= hours.filter(x=>x>0).length;
    const average = hours.reduce((a,b) => a+b,0) / hours.length;
    const success = target < average;
    const rating = Math.round(average);
    var ratingDescription = function (rating:number) {
    if(rating  < 1){return 'Bad'} ;
     if(rating >= 1 && rating <= 2){return "Keep working you're in the good path"}
     if(rating >= 2 && rating <= 3){return 'Good, stay in'};}
    

    const result : Result =  {
 periodLength ,
 trainingDays,
success ,
rating,
 ratingDescription,
target ,
average,
 }
 return result
}


try{
console.log(calculateExercises(target, hours))
}
catch(error:unknown){
    console.log(error);
}

