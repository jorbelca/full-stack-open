import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { MODIFY_BORN } from "./GraphQL/mutations"

function SetBirthyear({ notifyError, authors }) {
  const [name, setName] = useState("")
  const [born, setBorn] = useState()

  const [editAuthor] = useMutation(MODIFY_BORN, {
    onError: (error) => {
      notifyError(error.message)
    },
  })

  const handleForm = (event) => {
    event.preventDefault()
    const fBorn = Number(born)
    editAuthor({ variables: { name, fBorn } })

    setName("")
    setBorn("")
  }

  return (
    <>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleForm}>
        <div>
          <label>Name</label>
          <select value={authors} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Born</label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <input type="submit" value="Set Birthyear" />
      </form>
    </>
  )
}

export default SetBirthyear
