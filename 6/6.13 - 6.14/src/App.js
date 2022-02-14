import AnecdoteList from "./components/AnecdoteList"
import AnecdotForm from "./components/AnecdotForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import anecdotesService from "./services/anecdotesService"
import { initialAn } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then((anecdote) => dispatch(initialAn(anecdote)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdotForm />
    </div>
  )
}

export default App
