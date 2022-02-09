import React from "react"
const Create = ({ url, title, setUrl, setTitle, handleCreate }) => {
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        Title:{" "}
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Url:{" "}
        <input
          id="url"
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit" id="create" style={{ display: "" }}>
          Create
        </button>
      </form>
    </>
  )
}

export default Create
