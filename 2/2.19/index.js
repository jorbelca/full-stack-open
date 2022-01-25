import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/numbersApi"
import "./index.css"

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage) {
    return <div className="success">{successMessage}</div>
  }
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>
  } else {
    return <div style={{ display: "none" }}></div>
  }
}

const Persons = ({ persons, setPersons, setSuccessMessage }) => {
  const deletePers = (id, name) => {
    if (window.confirm(`Are you sure to delete the information of ${name}?`)) {
      deletePerson(id).then((response) => {
        setSuccessMessage(response.statusText)
        setTimeout(() => setSuccessMessage(""), 5000)
        getAllPersons().then((response) => {
          setPersons(response.data)
        })
      })
    }
  }

  return (
    <>
      <ul>
        {persons.map((person) => (
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
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

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
            setSuccessMessage(
              response.data.name +
                " with the number " +
                response.data.number +
                " has benn succesfully updated"
            )
            setTimeout(() => setSuccessMessage(""), 5000)
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
        setSuccessMessage(
          response.data.name +
            " with the number " +
            response.data.number +
            " has been succesfully created"
        )
        setTimeout(() => setSuccessMessage(""), 5000)
      })
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
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
      <Persons
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
