
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
    const ratingD : { [index: string]: string } = {
        1: 'Bad',
        2: "Keep working you're in the good path",
        3: 'Good, stay in',
      };
    
  

    const result : Result =  {
 periodLength ,
 trainingDays,
success ,
rating,
 ratingDescription :ratingD[rating],
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

