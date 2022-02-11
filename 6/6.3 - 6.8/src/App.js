import AnecdoteList from "./components/AnecdoteList"
import AnecdotForm from "./components/AnecdotForm"

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdotForm />
    </div>
  )
}

export default App
