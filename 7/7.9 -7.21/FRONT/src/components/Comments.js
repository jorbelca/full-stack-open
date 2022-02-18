import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import commentsService from "../services/commentsService"
import { useDispatch, useSelector } from "react-redux"
import { setComments } from "../reducers/commentsReducer"

function Comments() {
  const { id } = useParams((n) => n.id)
  const comments = useSelector((state) => state.comments)
  const blogs = useSelector((state) => state.blogs)

  // const author = (id) => {
  //   console.log(id)
  //   const authors = blogs.map((n) => n.user[0].id)
  //   if (authors === id) return authors.name
  // }

  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))

    commentsService.getAllComments(user.token).then((comments) => {
      dispatch(setComments(comments))
    })
  }, [dispatch])

  return (
    <>
      <h3>Commments</h3>
      <form>
        <input className="input is-medium" type="text" placeholder="comment" />
        <input type="button" value="Add comment" />
      </form>

      <ul>
        {comments
          .filter((item) => item.blog[0].id === id)
          .map((n) => (
            <li key={n.id}>
              {n.content} 
            </li>
          ))}
      </ul>
    </>
  )
}

export default Comments
