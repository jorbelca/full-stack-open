const Create = ({ url, title, setUrl, setTitle, handleCreate }) => {
 
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        Title:{" "}
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Url:{" "}
        <input
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default Create
