import { useState } from "react"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom"
import { useField } from "./hooks"

const Menu = () => {
  const padding = {
    paddingRight: 15,
    textDecoration: "none",
    color: "green",
    fontWeight: "bold",
  }
  return (
    <div>
      <menu>
        <Link style={padding} to="/">
          Anecdotes
        </Link>
        <Link style={padding} to="/create">
          Create new
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </menu>
      <hr />
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((n) => n.id === Number(id))

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>Has {anecdote.votes} votes</p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}
const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const CreateNew = (props) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    // if (e.nativeEvent.submitter.innerHTML === "Reset") {
    //   e.preventDefault()
    //   document.getElementById("createForm").reset()
    // }
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate("/")
  }

  const formStyle = {
    marginLeft: 10,
    marginBottom: 10,
  }
  const inputStyle = {
    marginLeft: 10,
    minWidth: "40%",
  }
  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form id="createForm" onSubmit={handleSubmit}>
        <div style={formStyle}>
          Content
          <input required style={inputStyle} name="content" {...content} />
        </div>
        <div style={formStyle}>
          Author
          <input required style={inputStyle} name="author" {...author} />
        </div>
        <div style={formStyle}>
          Url for more info
          <input required style={inputStyle} name="info" {...info} />
        </div>
        <button>Create</button>

        <input type="button" />
      </form>
    </div>
  )
}
const Footer = () => {
  const footStyl = {
    marginTop: 50,
    textAlign: "center",
  }
  return (
    <div style={footStyl}>
      Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
      <br />
      See{" "}
      <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
        https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
      </a>{" "}
      for the source code.
    </div>
  )
}

const Notification = ({ notification }) => {
  let notStyle = {
    border: "10px solid green",
    borderRadius: 9,
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  }
  if (
    notification === "" ||
    notification === "A new anecdote  has been created"
  ) {
    notStyle = { display: "none" }
  }
  return (
    <>
      <div style={notStyle}>{notification}</div>
    </>
  )
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ])
  const [notification, setNotification] = useState("")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} has been created`)
    setTimeout(() => setNotification(""), 10000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <Notification notification={notification} />
      <h1>Software anecdotes</h1>

      <Router>
        <Menu />

        <Routes>
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  )
}

export default App
