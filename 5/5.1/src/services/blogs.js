import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

const getAll = async (token) => {
  const request = await axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return request.data
}

export default { getAll }
