import React from "react"
const Create = ({ url, title, setUrl, setTitle, handleCreate }) => {
  return (
    <>
      <label className="label">Create New</label>
      <form onSubmit={handleCreate}>
        <div className="field">
          <div className="label">Title: </div>
          <div className="control">
            <input
              id="title"
              type="text"
              value={title}
              name="title"
              placeholder="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="label"> Url:</div>
          <div className="control">
            <input
              id="url"
              type="url"
              value={url}
              name="url"
              placeholder="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              id="create"
              style={{ display: "" }}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Create
