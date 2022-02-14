import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

const createNew = async (anecdote) => {
  try {

    const res = await axios.post(baseUrl, anecdote)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export default { getAll, createNew }
