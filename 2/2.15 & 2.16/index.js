import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

import { createPerson, getAllPersons } from "./services/numbersApi"

const Persons = ({ persons }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
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

const Filter = ({ search, persons, newSearch, setPersons }) => {
  const filter = (search) => {
    setPersons(
      persons.filter(
        (person) =>
          person.name.toLocaleLowerCase().includes(search.toLowerCase()) ||
          person.number.includes(search)
      )
    )
  }

  const handleFilter = (e) => {
    newSearch(e.target.value)
    filter(e.target.value)
  }
  return (
    <div>
      Filter shown with<span>&nbsp;</span>
      <span>
        <input value={search} onChange={handleFilter} />
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, newSearch] = useState("")

  useEffect(() => {
    getAllPersons().then((response) => {
      setPersons(response.data)
    })
  }, [])

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
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    compare(newName, newPerson)
  }

  const compare = (newName, newPerson) => {
    if (persons.filter((person) => person.name === newName).length >= 1) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      createPerson(newPerson).then((response) => {
        alert(
          response.data.name +
            " with the number " +
            response.data.number +
            " has benn succesfully created"
        )
      })
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        search={search}
        persons={persons}
        newSearch={newSearch}
        setPersons={setPersons}
      />
      <h3>Add a New</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handlePerson={handlePerson}
        handlePersonNumber={handlePersonNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
