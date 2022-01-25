import axios from "axios"
const baseURL = "http://localhost:3001/persons"

export const getAllPersons = () => {
  const request = axios.get(baseURL)
  return request
  // request.then((response) => {
  //   const { data } = response
  //   return data
}

export const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request
}

export const updatePerson = (id, newPerson) => {
  const request = axios.put(baseURL)
  return request.then((response) => response.data)
}
