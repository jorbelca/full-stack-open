import React, { useState } from "react"
import ReactDOM from "react-dom"

const Persons = ({ persons, search }) => {
  return (
    <>
      <ul>
        {persons
          .filter((person) => {
            if (search === "") {
              return person
            } else if (person.name.toLowerCase().includes(search.trim())) {
              return person
            }
          })
          .map((person) => (
            <li key={person.name}>
              <span>{person.name}</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>{person.number}</span>
            </li>
          ))}
      </ul>
    </>
  )
}

const Filter = ({ newSearch }) => {
  return (
    <div>
      Filter shown with<span>&nbsp;</span>
      <span>
        <input
          id="filterPerson"
          type="text"
          placeholder="name"
          onChange={(e) => {
            newSearch(e.target.value)
          }}
        />
      </span>
    </div>
  )
}

const PersonForm = ({
  addName,
  newName,
  handlePerson,
  newNumber,
  handlePersonNumber,
}) => {
  return (
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
  )
}

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
    if (
      persons.filter(
        (person) =>
          person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      ).length >= 1
    ) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(pers))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} />
      <h3>Add a New</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handlePerson={handlePerson}
        handlePersonNumber={handlePersonNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
