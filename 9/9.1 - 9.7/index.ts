import express from "express"
import { calculateBmi } from "./bmiCalculators"
const app = express()

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack")
})

app.get  ('/bmi?', async(req, res) => {

    let height = Number(req.query.height)
    let weight = Number( req.query.weight)

    
    const resp:any = calculateBmi(height,weight)
    res.send( await resp)
})

const port = 3002


app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
    
})