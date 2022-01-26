const express = require("express")
const app = express()
app.use(express.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "567898767",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "perico",
    number: "2",
    id: 5,
  },
  {
    name: "ana",
    number: "2",
    id: 6,
  },
  {
    name: "a",
    number: "1",
    id: 7,
  },
]
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/info", (request, response) => {
  const people = persons.length

  const date = new Date().toUTCString()

  response.send(`The phonebook has info of ${people} people </br> ${date}`)
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  if (persons.filter((person) => person.name === body.name).length == 1) {
    return response.status(400).json({
      error: "The name must be unique",
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
