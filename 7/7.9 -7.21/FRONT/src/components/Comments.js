import React, { useState } from "react"
import { useParams } from "react-router-dom"
import commentsService from "../services/commentsService"
import { useDispatch, useSelector } from "react-redux"
import { createComment } from "../reducers/commentsReducer"

function Comments() {
  const { id } = useParams((n) => n.id)
  const comments = useSelector((state) => state.comments)
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const handleSubmit = (e) => {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    const userId = users.find((n) => n.name === user.name)
    const content = comment
    e.preventDefault()

    const newComment = {
      content,
      userId: userId.id,
      blogId: id,
    }
    commentsService
      .createComment(user.token, newComment)
      .then((response) => dispatch(createComment(response)))
  }

  return (
    <>
      <label className="label">Commments</label>

      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </div>

          <div className="control">
            <button className="button is-info" type="submit">
              Add a comment
            </button>
          </div>
        </div>
      </form>

      <ul key="000" className="mt-4">
        {comments
          .filter((item) => item.blog[0].id === id)
          .map((n) => (
            <li className="panel-block" key={n.id}>
              <span className="icon is-small">
                <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
              </span>
              {n.content}
            </li>
          ))}
      </ul>
    </>
  )
}

export default Comments
