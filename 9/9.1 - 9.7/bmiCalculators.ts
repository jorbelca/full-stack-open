
const height = Number(process.argv[2])
const weight = Number(process.argv[3])

const calculateBmi = (height: number, weight: number) => {
 
const BMI =  (  weight/((height/100)*(height/100)) ) 


 if( BMI < 18.5) return 'Underweight'
 if( BMI < 25 && BMI >18.5) return 'Normal Weight' 
  if( BMI < 29.9 && BMI >25) return 'Overweight' 
  if( BMI > 30) return 'Obesity'
 }

 try{
 console.log(calculateBmi(180, 74))}
 catch(error: unknown) {
      console.log(error);
      
 }