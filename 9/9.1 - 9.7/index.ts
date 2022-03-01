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

    var hours = Array(req.body.daily_exercises)
    var target = Number(req.body.target)

    if(!target ||  isNaN(Number(target)))return res.send({error: 'parameters missing'}).status(400)
    if(!hours ||  isNaN(Number(hours))) return res.send({error: 'parameters missing'}).status(400)

    const resp = calculateExercises(target,hours)

return res.send(resp)
})

const port = 3002;


app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
    
});