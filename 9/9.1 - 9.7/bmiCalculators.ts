
const height:number = Number(process.argv[2])
const weight:number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number) => {

     
 
const BMI =  (  weight/((height/100)*(height/100)) ) 


 if( BMI < 18.5) console.log( 'Underweight')
 if( BMI < 25 && BMI >18.5) console.log( 'Normal Weight' )
  if( BMI < 29.9 && BMI >25) console.log( 'Overweight' )
  if( BMI > 30) console.log( 'Obesity')
 }

 try{
calculateBmi(height, weight)}
 catch(error: unknown) {
      console.log(error);
      
 }