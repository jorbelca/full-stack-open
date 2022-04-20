import axios from "axios"
const baseUrl = "http://localhost:3030/api/login"

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export default { login }
