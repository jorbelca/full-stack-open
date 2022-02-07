import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

const setHeader = (token) => {
  return { Authorization: `Bearer ${token}` }
}
const getAll = async (token) => {
  const request = await axios.get(baseUrl, {
    headers: setHeader(token),
  })

  return request.data
}

const createBlog = async (token, newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: setHeader(token),
  })
  return response.data
}

const deleteBlog = async (token, id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: setHeader(token),
  })
  return response.data
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
