
// const target = Number(process.argv[2]);
// const hours: number[] = [];

// for (let i = 3; i < process.argv.length; i ++){
//     hours.push(Number( process.argv[i]));
// }

interface Result{
 periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number
  ratingDescription: any,
  target: number,
  average: number 
    }
export const calculateExercises = (target:number,hours:number[]) => {
   
 
    const periodLength = hours.length;
    const trainingDays= hours.filter(x=>x>0).length;
    const average = hours.reduce((a,b) => a+b,0) / hours.length;
    const success = target < average;
    const rating = Math.round(average);
    const ratingDescription = (rating:number) => {
        if(rating  < 1){return 'Bad';} 
         if(rating >= 1 && rating <= 2){return "Keep working you're in the good path";}
         if(rating >= 2 && rating <= 3){return 'Good, stay in';}
        else return null;}
    

    const result : Result =  {
 periodLength ,
 trainingDays,
success ,
rating,
 ratingDescription ,
target ,
average,
 };


 return result;
};


// try{
// console.log(calculateExercises(target, hours));
// }
// catch(error:unknown){
//     console.log(error);
// }

