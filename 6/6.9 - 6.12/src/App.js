import AnecdoteList from "./components/AnecdoteList"
import AnecdotForm from "./components/AnecdotForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
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
