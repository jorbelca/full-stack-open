import express from "express";
import { calculateBmi } from "./bmiCalculators";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});

app.get('/bmi?', (req, res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(!height || isNaN(height)) return res.send({error:'Please give the correct height parameters'})
if(!weight || isNaN(weight)) return res.send({error:'Please give the correct weight parameters'})
    
    const resp = calculateBmi(height,weight);
    return res.send( resp);
});

app.post('/',jsonParser, (req,res) => {
    const body = req.body;

    var target = Number(body.target)

    if (
        !Array.isArray(body.daily_exercises) ||
        body.daily_exercises.length === 0
      ) {
        res.status(400).json({
          error: "malformatted parameters",
        });
        return;
      }
      const exercises = body.daily_exercises.map((e: number | string) => Number(e));
      for (const value of exercises) {
        if (isNaN(value)) {
          res.status(400).json({
            error: "malformatted parameters",
          });
          return;
        }
      }
      if (exercises.filter((e: number) => e < 0).length > 0) {
        res.status(400).json({
          error: "Negative values are not allowed",
        });
        return;
      }

    const resp = calculateExercises(target,exercises)
    
    

return res.send(resp)
})

const port = 3002;


app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
    
});