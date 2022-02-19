import axios from "axios"

const baseUrl = "http://localhost:3003/api/comments"

export const setHeader = (token) => {
  return { Authorization: `Bearer ${token}` }
}

const getAllComments = async (token) => {
  try {
    const request = await axios.get(baseUrl, {
      headers: setHeader(token),
    })

    return request.data
  } catch (e) {
    console.error(e)
  }
}

const createComment = async (token, comment) => {
  console.log(comment);
  try {
    const response = await axios.post(baseUrl, comment, {
      headers: setHeader(token),
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const deleteComment = async (token, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: setHeader(token),
    })

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export default { createComment, deleteComment, getAllComments }
