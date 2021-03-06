import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/numbersApi"

const Persons = ({ persons, setPersons, search }) => {
  const deletePers = (id, name) => {
    if (window.confirm(`Are you sure to delete the information of ${name}?`)) {
      deletePerson(id).then((response) => {
        alert(response.statusText)
        getAllPersons().then((response) => {
          setPersons(response.data)
        })
      })
    }
  }

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
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <button onClick={() => deletePers(person.id, person.name)}>
                Delete
              </button>
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
      id: persons[persons.length - 1].id + 1,
    }
    compare(newPerson)
  }

  const compare = (newPerson) => {
    persons.forEach((person) => {
      // UPDATE
      if (
        person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
      ) {
        if (
          window.confirm(
            `${person.name} is already in the phonebook, do you want to replace the old number with a new one?`
          )
        ) {
          updatePerson(person.id, newPerson).then((response) => {
            alert(
              response.data.name +
                " with the number " +
                response.data.number +
                " has benn succesfully updated"
            )
          })
          getAllPersons().then((response) => {
            setPersons(response.data)
          })
          setNewName("")
          setNewNumber("")
        }
      }
    })
    // CREATE
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
      <Filter newSearch={newSearch} />
      <h3>Add a New</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handlePerson={handlePerson}
        handlePersonNumber={handlePersonNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} search={search} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
