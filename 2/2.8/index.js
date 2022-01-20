import React, { useState } from "react"
import ReactDOM from "react-dom"

const Person = ({ person }) => {
  return (
    <>
      <span>{person.name}</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>{person.number}</span>
    </>
  )
}

const initial = [
  { name: "Arto Hellas", number: "040-123456" },
  { name: "Ada Lovelace", number: "39-44-5323523" },
  { name: "Dan Abramov", number: "12-43-234345" },
  { name: "Mary Poppendieck", number: "39-23-6423122" },
]

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, newSearch] = useState("")

  const handlePerson = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const handlePersonNumber = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const pers = {
      name: newName,
      number: newNumber,
    }
    compare(newName, pers)
  }

  const compare = (newName, pers) => {
    if (persons.filter((person) => person.name === newName).length >= 1) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(pers))
      setNewName("")
      setNewNumber("")
    }
  }

  const filter = (search) => {
    const result = persons.filter((person) => {
      if (
        person.name.toLocaleLowerCase().includes(search.toLowerCase()) ||
        person.number.includes(search)
      ) {
        return person
      }
    })

    setPersons(result)
  }

  const handleFilter = (e) => {
    newSearch(e.target.value)
    filter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with<span>&nbsp;</span>
        <span>
          <input value={search} onChange={handleFilter} />
        </span>
      </div>
      <h3>Add a New</h3>
      <form onSubmit={addName}>
        <div>
          Name:<span>&nbsp;</span>
          <span>&nbsp;</span>
          <input type="text" value={newName} onChange={handlePerson} />
          <div>
            Number:
            <input
              type="number"
              value={newNumber}
              onChange={handlePersonNumber}
            />
          </div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Person person={person} />
          </li>
        ))}
        {/* {persons.filter((person) => {
          if (search !== "") return search
          return ""
        })} */}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
