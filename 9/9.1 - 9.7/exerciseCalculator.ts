

const calculateExercises = (hours:number[],target:number) => {
    interface Result{
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
    const success = target < average
    const rating = Math.round(average);
    const ratingDescription = (rating:number):string =>{
    if(rating  < 1)  'Bad' ;

    else if(rating > 1 && rating <2)return "Keep working you're in the good path";
   else  if(rating >2 && rating < 3)return 'Good, stay in';}
    


    const result : Result =  {
 periodLength ,
 trainingDays,
success ,
rating,
ratingDescription,
target ,
average
    }


    return result
}


try{
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] ,2))}
catch(error:unknown){
    console.log(error);
    
}
