require("dotenv").config()
const express = require("express")
// const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("build"))
// app.use(
//   morgan(function (tokens, req, res) {
//     morgan.token("content", function (req, res) {
//       return JSON.stringify(req.body)
//     })

//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//       tokens.content(req, res),
//       " ",
//     ].join(" ")
//   })
// )
const connectDB = () => require("./connectionDb")
connectDB()
const Person = require("./models/person")
const req = require("express/lib/request")
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get("/id", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(persons.map((person) => `${person.id}`))
  })
})

app.get("/info", (request, response) => {
  const people = Person.find({}).then((persons) => {
    console.log(persons.length.toString())
    return JSON.stringify(persons.length)
  })

  const date = new Date().toUTCString()

  response.send(`The phonebook has info of ${people} people </br> ${date}`)
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:idx", (request, response) => {
  const idx = Number(request.params.idx)
  Person.findOne({ idx: idx }).then((person) => response.json(person))
})

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((person) =>
    response.json(person)
  )

  response.status(200).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const newBorn = new Person({
    name: body.name,
    number: body.number,
  })

  newBorn.save().then((savedPers) => {
    response.json(savedPers)
  })
})

app.put("/api/persons/:id", (request, response) => {
  Person.findByIdAndUpdate(request.params.id, {
    number: request.body.number,
  }).then((person) => response.json(person))
})
