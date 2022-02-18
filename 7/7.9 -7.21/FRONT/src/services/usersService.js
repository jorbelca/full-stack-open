import axios from "axios"
import { setHeader } from "./blogService"

const baseURL = "http://localhost:3003/api/users"

export const getAllUsers = async (token) => {
  try {
    const request = await axios.get(baseURL, {
      headers: setHeader(token),
    })

    return request.data
  } catch (e) {
    console.error(e)
  }
}
