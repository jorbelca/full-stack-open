import AnecdoteList from "./components/AnecdoteList"
import AnecdotForm from "./components/AnecdotForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initialAn } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialAn())
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
