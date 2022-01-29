require("dotenv").config()
const express = require("express")

const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

const connectDB = () => require("./connectionDb")
connectDB()
const Person = require("./models/person")
const { request, response } = require("express")

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
  Person.find({}).then((persons) => {
    persons.map((person) => people.push(person))
  })
  let people = []
  const date = new Date().toUTCString()

  response.send(`The phonebook has info of ${people} people </br> ${date}`)
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((e) => next(e))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((e) => next(e))
})

app.post("/api/persons", (request, response, next) => {
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

  newBorn
    .save()
    .then((savedPers) => {
      return savedPers.toJSON()
    })
    .then((savedAndFormatted) => {
      response.json(savedAndFormatted)
    })
    .catch((e) => next(e))
})

app.put("/api/persons/:id", (request, response, next) => {
  const updatePers = {
    name: request.body.name,
    number: request.body.number,
  }
  Person.findByIdAndUpdate(request.params.id, updatePers, {
    runValidators: true,
  })
    .then((updatePerson) => response.json(updatePerson))
    .catch((e) => next(e))
})

// MIDDLEWARES
app.use((request, response) => {
  response.status(404).end()
})
app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else {
    response.status(500).end()
  }

  next(error)
})
