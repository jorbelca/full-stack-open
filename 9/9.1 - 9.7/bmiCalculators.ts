
// const height:number = Number()
// const weight:number = Number()

export const calculateBmi = (height: number, weight: number) => {


const BMI =  (  weight/((height/100)*(height/100)) ); 

 if( BMI < 18.5) return 'Underweight';
 if( BMI < 25 && BMI >18.5) return 'Normal Weight'; 
  if( BMI < 29.9 && BMI >25) return 'Overweight'; 
  if( BMI > 30) return 'Obesity';
  else return null;
 };

//  try{
// calculateBmi(height, weight)}
//  catch(error: unknown) {
//       console.log(error);
      
//  }