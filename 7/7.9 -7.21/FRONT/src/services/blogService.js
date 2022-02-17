import { setWarning, setNotification } from "../reducers/notificationReducer"
import axios from "axios"

const baseUrl = "http://localhost:3003/api/blogs"

const setHeader = (token) => {
  return { Authorization: `Bearer ${token}` }
}
const getAll = async (token) => {
  try {
    const request = await axios.get(baseUrl, {
      headers: setHeader(token),
    })

    return request.data
  } catch (e) {
    console.error(e)
  }
}

const createBlog = async (token, newBlog) => {
  try {
    const response = await axios.post(baseUrl, newBlog, {
      headers: setHeader(token),
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const deleteBlog = async (token, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: setHeader(token),
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}

const updateBlog = async (token, id, updatedLikes) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedLikes, {
      headers: setHeader(token),
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}
export default { getAll, setHeader, createBlog, updateBlog, deleteBlog }
