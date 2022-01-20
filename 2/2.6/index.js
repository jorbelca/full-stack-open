import React, { useState } from "react"
import ReactDOM from "react-dom"

const Person = ({ person }) => {
  return <>{person.name}</>
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const addPerson = (e) => {
    e.preventDefault()
    console.log("Click", e.target.value)
  }

  const handlePerson = (e) => {
    setNewName(e.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const pers = {
      name: newName,
    }

    setPersons(persons.concat(pers))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handlePerson} />
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
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
